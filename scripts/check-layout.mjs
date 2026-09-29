import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// A migration invariant check, not a build: existing unresolved references remain
// visible, but changing any project/solution edge accidentally fails the check.
const repo = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFileSync(path.join(repo, file));
const git = (...args) => execFileSync('git', args, { cwd: repo, maxBuffer: 64 * 1024 * 1024 });
const { base, moves } = JSON.parse(read('docs/layout-moves.json'));
// Pin reviewed corrections and intentional cleanup separately from the original
// move map. Missing files or arbitrary source changes still fail this audit.
const adjustments = JSON.parse(read('docs/layout-adjustments.json'));
assert.equal(adjustments.base, base);
const operationalCorrections = new Map(adjustments.changed.map(entry => [entry.path, entry.blob]));
const retiredCounts = new Map(adjustments.retired.map(entry => [entry.path, 0]));
const retirement = file => adjustments.retired.find(entry => entry.path.endsWith('/') ? file.startsWith(entry.path) : file === entry.path);
function moved(file) {
  const entry = moves.find(([old]) => file === old || file.startsWith(old + '/'));
  return entry ? entry[1] + file.slice(entry[0].length) : file;
}
function decode(bytes) { return bytes.toString(bytes[0] === 255 && bytes[1] === 254 ? 'utf16le' : 'utf8'); }
function references(file, text) {
  const regex = file.endsWith('.sln')
    ? /Project\("[^"\r\n]+"\)\s*=\s*"[^"\r\n]*",\s*"([^"\r\n]+\.(?:csproj|esproj|slnx))"/g
    : /<(?:ProjectReference|Project)\b[^>]*?\b(?:Include|Path)="([^"\r\n]+)"/g;
  return [...text.matchAll(regex)].map(m => path.posix.normalize(path.posix.join(path.posix.dirname(file), m[1].replaceAll('\\', '/'))));
}
const entries = git('ls-tree', '-r', '-z', base).toString().split('\0').filter(Boolean).map(line => {
  const [metadata, file] = line.split('\t');
  return { file, blob: metadata.split(' ')[2] };
});
let projects = 0, edges = 0, preserved = 0, unchanged = 0, retiredFiles = 0;
const missing = [];
for (const {file, blob} of entries) {
  const destination = moved(file);
  const retired = retirement(file);
  if (retired) {
    assert.ok(!existsSync(path.join(repo, destination)), `Retired file reappeared: ${destination}`);
    retiredCounts.set(retired.path, retiredCounts.get(retired.path) + 1);
    retiredFiles++;
    continue;
  }
  assert.ok(existsSync(path.join(repo, destination)), `Lost file: ${file} → ${destination}`);
  const bytes = read(destination);
  const actual = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if (actual === blob) unchanged++;
  // Preserve algorithms and generated models; only reviewed, pinned corrections
  // may differ beyond the original refactor's project-path edits.
  const editable = /\.(csproj|sln)$/.test(file) || ['.gitignore', 'README.md', 'package.json', 'package-lock.json'].includes(file);
  if (!editable) assert.equal(actual, operationalCorrections.get(destination) ?? blob, `Unexpected content change: ${destination}`);
  if (/\.(csproj|esproj|sln|slnx)$/.test(file)) {
    const before = references(file, decode(git('show', `${base}:${file}`))).filter(target => !retirement(target)).map(moved);
    const after = references(destination, decode(read(destination)));
    assert.deepEqual(after, before, `Reference targets changed: ${destination}`);
    projects++; edges += after.length;
    for (const target of after) if (!existsSync(path.join(repo, target))) missing.push({project:destination,target});
  }
  if (file === 'Result.json' || file.startsWith('experiments/') || file.startsWith('tex/')) {
    assert.equal(actual, blob, `Historical bytes changed: ${destination}`);
    preserved++;
  }
}
for (const entry of adjustments.retired) assert.equal(retiredCounts.get(entry.path), entry.fileCount, `Retirement count changed: ${entry.path}`);
const pkg = JSON.parse(read('package.json')), lock = JSON.parse(read('package-lock.json'));
assert.deepEqual(pkg.workspaces, lock.packages[''].workspaces);
for (const workspace of pkg.workspaces) {
  assert.ok(lock.packages[workspace], `Workspace missing from lock: ${workspace}`);
  const name = JSON.parse(read(workspace + '/package.json')).name;
  assert.equal(lock.packages['node_modules/' + name].resolved, workspace);
}
console.log(`Accounted for ${entries.length} original files (${retiredFiles} intentionally retired); ${projects} projects/solutions, ${edges} reference targets, ${preserved} historical blobs verified.`);
console.log(`${unchanged} original files are byte-identical; ${operationalCorrections.size} pinned operational corrections verified alongside project/solution and root documentation/configuration edits.`);
console.log(`Unresolved legacy project/solution references: ${missing.length}; base targets preserved except explicitly retired projects.`);
if (process.argv.includes('--details')) console.log(JSON.stringify(missing, null, 2));

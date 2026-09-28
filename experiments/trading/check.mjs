import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { compareResults } from './historical/aapl-daily/compare.mjs';

const repo = new URL('../../', import.meta.url);
const archive = new URL('./historical/aapl-daily/', import.meta.url);
const read = file => readFileSync(new URL(file, archive));
const json = file => JSON.parse(read(file));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const provenance = JSON.parse(readFileSync(new URL('./historical/provenance.json', import.meta.url)));
for (const entry of provenance.entries) {
  const bytes = readFileSync(new URL(entry.archived, repo));
  const blob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  assert.equal(blob, entry.blob, `Archive changed: ${entry.archived}`);
}
const source = json('data/source.json');
assert.equal(sha(read(source.dataFile)), source.dataSha256);
assert.equal(sha(read(source.rawFile)), source.rawSha256);
const a = json('Trading_CSharp.json'), b = json('Trading_TypeScript.json');
assert.deepEqual(a.metadata.source, source);
assert.deepEqual(b.metadata.source, source);
const summary = compareResults(a, b, json(source.dataFile), json('config.json'));
summary.resultSha256 = { CSharp: sha(read('Trading_CSharp.json')), TypeScript: sha(read('Trading_TypeScript.json')) };
summary.provenance = a.metadata.provenance;
assert.equal(summary.passed, true, JSON.stringify(summary.issues));
assert.deepEqual(summary, json('summary.json'));
console.log('Archive hashes and historical comparison verified; no results written.');
const tests = spawnSync(process.execPath, ['--test', fileURLToPath(new URL('tests.mjs', archive))], { stdio: 'inherit' });
if (tests.error) throw tests.error;
process.exitCode = tests.status ?? 1;

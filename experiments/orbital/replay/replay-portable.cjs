#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

function argumentsFor(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--repo' || token === '--out') {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw Error(`Missing value for ${token}`);
      options[token.slice(2)] = argv[++i];
    } else if (['csharp', 'baseline', 'corrected'].includes(token) && !options.mode) {
      options.mode = token;
    } else {
      throw Error(`Unexpected argument: ${token}`);
    }
  }
  if (!options.repo || !options.out || !options.mode) {
    throw Error('Usage: node replay-portable.cjs csharp|baseline|corrected --repo <checkout> --out <evidence>');
  }
  return { repo: path.resolve(options.repo), out: path.resolve(options.out), mode: options.mode };
}

const hashBytes = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const hashFile = filename => hashBytes(fs.readFileSync(filename));

function command(repo, executable, args, shell = false) {
  const result = spawnSync(executable, args, {
    cwd: repo, encoding: 'utf8', windowsHide: true, shell,
    timeout: 60000, maxBuffer: 64 * 1024 * 1024
  });
  return result.status === 0 ? result.stdout.trim() : null;
}

function sourceManifest(repo, ownsGitRoot) {
  const tracked = ownsGitRoot ? command(repo, 'git', ['ls-files', '-z']) : null;
  const excluded = new Set(['.git', '.vs', '.idea', 'bin', 'obj', 'node_modules', 'coverage']);
  const candidates = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && !excluded.has(entry.name)) walk(path.join(directory, entry.name));
      else if (entry.isFile()) candidates.push(path.relative(repo, path.join(directory, entry.name)).replaceAll('\\', '/'));
    }
  }
  if (tracked !== null) candidates.push(...tracked.split('\0').filter(Boolean));
  else walk(repo);
  const selected = candidates.filter(relative =>
    /\.(cs|csproj|ts|tsx|props|targets|sln|slnx)$/i.test(relative) ||
    /(^|\/)(global\.json|package(?:-lock)?\.json|tsconfig[^/]*\.json|nuget\.config|packages\.lock\.json)$/i.test(relative)
  ).sort();
  const files = {};
  for (const relative of selected) {
    const filename = path.join(repo, relative);
    files[relative] = fs.existsSync(filename) ? hashFile(filename) : null;
  }
  if (!selected.length) throw Error('No source files found in the supplied checkout');
  return {
    inventory: tracked === null ? 'source-tree traversal (Git inventory unavailable)' : 'git ls-files',
    selection: 'C#/TypeScript source and projects, MSBuild solution/props/targets, global.json, npm manifests/locks, tsconfig, NuGet configuration/locks; generated dependency/build directories excluded when Git is unavailable',
    fileCount: selected.length,
    sha256: hashBytes(JSON.stringify(files)),
    files
  };
}

function playwright() {
  try { return { api: require('playwright'), version: require('playwright/package.json').version }; }
  catch (error) {
    if (process.env.PLAYWRIGHT_MODULE) return {
      api: require(process.env.PLAYWRIGHT_MODULE),
      version: require(path.join(process.env.PLAYWRIGHT_MODULE, 'package.json')).version
    };
    throw Error('Install playwright beside this script, or set PLAYWRIGHT_MODULE to its module directory', { cause: error });
  }
}

function validateRecords(records) {
  if (!Array.isArray(records) || !records.length) throw Error('Execution returned no records');
  for (const [i, record] of records.entries()) {
    for (const key of ['orbitalTime', 'x', 'y', 'z', 'vx', 'vy', 'vz']) {
      if (!Number.isFinite(record[key])) throw Error(`Record ${i}: ${key} is not finite`);
    }
  }
}

async function main() {
  const { repo, out, mode } = argumentsFor(process.argv.slice(2));
  const protocolFile = path.join(out, 'protocol.json');
  // The distributed protocol is an input, never synthesized or overwritten here.
  const protocolBytes = fs.readFileSync(protocolFile);
  const protocol = JSON.parse(protocolBytes);
  if (!Array.isArray(protocol.scenarios) || protocol.scenarios.length !== 4) throw Error('Expected the supplied four-scenario protocol');
  const gitRoot = command(repo, 'git', ['rev-parse', '--show-toplevel']);
  const canonicalPath = value => process.platform === 'win32' ? path.resolve(value).toLowerCase() : path.resolve(value);
  const ownsGitRoot = gitRoot !== null && canonicalPath(gitRoot) === canonicalPath(repo);
  const source = sourceManifest(repo, ownsGitRoot);
  const gitHead = ownsGitRoot ? command(repo, 'git', ['rev-parse', 'HEAD']) : null;
  if (gitHead && gitHead !== protocol.baseCommit) throw Error(`Checkout HEAD ${gitHead} differs from protocol base ${protocol.baseCommit}`);
  const cases = mode === 'baseline' ? protocol.scenarios.slice(0, 1) : protocol.scenarios;
  const environmentName = `${mode}-environment.json`;
  const manifestName = `${mode}-source-manifest.json`;
  const outputNames = [environmentName, manifestName, ...cases.map((_, i) => `${mode}-run${i + 1}.json`)];
  for (const filename of outputNames) {
    if (fs.existsSync(path.join(out, filename))) throw Error(`Refusing to overwrite ${filename}; use a fresh output directory`);
  }
  const save = (filename, value) => fs.writeFileSync(path.join(out, filename), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  const csharpUrl = new URL(process.env.CSHARP_URL || 'http://127.0.0.1:5419');
  const frontendUrl = new URL(process.env.FRONTEND_URL || 'http://127.0.0.1:5189/dist/');
  if (!frontendUrl.pathname.endsWith('/')) frontendUrl.pathname += '/';
  const gitDiff = ownsGitRoot ? command(repo, 'git', ['diff', '--binary', 'HEAD', '--']) : null;
  const environment = {
    mode, startedUTC: new Date().toISOString(), baseCommit: protocol.baseCommit,
    gitHead, gitStatus: ownsGitRoot ? command(repo, 'git', ['status', '--short']) : null,
    gitDiffSha256: gitDiff === null ? null : hashBytes(gitDiff),
    protocolSha256: hashBytes(protocolBytes), runnerSha256: hashFile(__filename),
    sourceManifest: manifestName, sourceManifestSha256: source.sha256,
    nodeVersion: process.version, platform: process.platform, architecture: process.arch,
    osRelease: os.release(), dotnetSdk: command(repo, 'dotnet', ['--version']),
    dotnetInfo: command(repo, 'dotnet', ['--info']),
    npmVersion: command(repo, process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--version'], process.platform === 'win32'),
    csharpUrl: csharpUrl.href, frontendUrl: frontendUrl.href
  };
  save(manifestName, source);
  let browser;
  try {
    let page;
    if (mode !== 'csharp') {
      const automation = playwright();
      browser = await automation.api.chromium.launch(process.env.CHROME_PATH
        ? { executablePath: process.env.CHROME_PATH, headless: true }
        : { channel: 'chrome', headless: true });
      environment.browserVersion = browser.version();
      environment.playwrightVersion = automation.version;
      environment.headless = true;
      environment.browserSelection = process.env.CHROME_PATH || 'channel:chrome';
      page = await browser.newPage();
      page.on('pageerror', error => console.error('Browser:', error.message));
      await page.goto(frontendUrl.href, { waitUntil: 'domcontentloaded' });
    }
    for (const [i, condition] of cases.entries()) {
      const startedUTC = new Date().toISOString();
      let records;
      if (mode === 'csharp') {
        const response = await fetch(new URL('/api/orbital/forecastfromnumber', csharpUrl), {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(condition), signal: AbortSignal.timeout(600000)
        });
        if (!response.ok) throw Error(`${response.status} ${await response.text()}`);
        records = await response.json();
      } else {
        const moduleUrl = new URL('src/Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation.ts', frontendUrl).href;
        records = await page.evaluate(async ({ condition, moduleUrl }) => {
          const { OrbitalForecastCalculation } = await import(moduleUrl);
          return await new OrbitalForecastCalculation().calculate(condition, new AbortController());
        }, { condition, moduleUrl });
      }
      validateRecords(records);
      save(`${mode}-run${i + 1}.json`, {
        condition, startedUTC, finishedUTC: new Date().toISOString(),
        protocolSha256: environment.protocolSha256, sourceManifestSha256: source.sha256, records
      });
      console.log(`${mode} run ${i + 1}: ${records.length} records; first time ${records[0].orbitalTime}`);
    }
    if (sourceManifest(repo, ownsGitRoot).sha256 !== source.sha256) throw Error('Source files changed during replay; do not treat these outputs as a stable-source run');
    if (hashFile(protocolFile) !== environment.protocolSha256) throw Error('Protocol changed during replay');
    environment.sourceUnchangedDuringRun = true;
    environment.completed = true;
  } catch (error) {
    environment.completed = false;
    environment.error = error.stack || String(error);
    throw error;
  } finally {
    environment.finishedUTC = new Date().toISOString();
    save(environmentName, environment);
    if (browser) await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });

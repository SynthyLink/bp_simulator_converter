import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import { build, version as esbuildVersion } from 'esbuild';

const root = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(root, '../..');
const hash = content => createHash('sha256').update(content).digest('hex');
const json = file => JSON.parse(readFileSync(path.join(root, file),'utf8'));
const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim();
mkdirSync(path.join(root,'.build'), {recursive:true});
const source = json('data/source.json');
if (hash(readFileSync(path.join(root,source.dataFile))) !== source.dataSha256 ||
    hash(readFileSync(path.join(root,source.rawFile))) !== source.rawSha256) throw Error('Dataset hash mismatch');
const config = json('config.json');
const bars = json(source.dataFile);
if (bars.length !== source.rowCount || bars.some((b,i) => b.date < config.startInclusive || b.date >= config.endExclusive ||
    (i && bars[i-1].date >= b.date))) throw Error('Invalid date range/order/count');
// Include tracked library sources and untracked experiment sources, excluding generated results.
const inputs = git('ls-files','src').split('\n').filter(f => /\.(cs|csproj|ts)$/.test(f));
function addFiles(dir) {
    for (const entry of readdirSync(dir,{withFileTypes:true})) {
        if (['node_modules','.build','bin','obj','data'].includes(entry.name)) continue;
        const file = path.join(dir,entry.name);
        if (entry.isDirectory()) addFiles(file);
        else if (/\.(mjs|ts|cs|csproj)$/.test(entry.name) || ['config.json','package.json','package-lock.json'].includes(entry.name))
            inputs.push(path.relative(repo,file).replaceAll('\\','/'));
    }
}
addFiles(root);
inputs.push('global.json');
const manifest = [...new Set(inputs)].sort().map(file => ({file,sha256:hash(readFileSync(path.join(repo,file),'utf8').replaceAll('\r\n','\n'))}));
const changedFiles = new Set([...git('diff','--name-only','HEAD').split('\n'), ...git('ls-files','--others','--exclude-standard').split('\n')]);
const assets = json('CSharp/obj/project.assets.json');
const metadata = {
    schemaVersion: 1, config, source,
    provenance: { commit:git('rev-parse','HEAD'), branch:git('branch','--show-current'),
        sourceDirty:manifest.some(entry=>changedFiles.has(entry.file)), sourceSha256:hash(JSON.stringify(manifest)),
        sourceManifest: 'source-manifest.json', note:'Commit plus source fingerprint identify the implementation; sourceDirty excludes result artifacts.' },
    environment: { os:os.type(), osRelease:os.release(), arch:process.arch, node:process.version,
        dotnetSdk:execFileSync('dotnet',['--version'],{encoding:'utf8',cwd:repo}).trim(), esbuild:esbuildVersion,
        npm: process.platform === 'win32' ? execFileSync('cmd.exe',['/d','/s','/c','npm.cmd --version'],{encoding:'utf8'}).trim() : execFileSync('npm',['--version'],{encoding:'utf8'}).trim(),
        nugetPackages:Object.keys(assets.libraries).filter(key=>assets.libraries[key].type==='package').sort() },
    positionEncoding: { '0':'flat', '1':'short', '2':'long', null:'not yet initialized' }
};
writeFileSync(path.join(root,'source-manifest.json'), JSON.stringify({
    sourceSha256:metadata.provenance.sourceSha256, fileCount:manifest.length,
    algorithm:'SHA-256 of JSON.stringify(sorted array of {file, sha256}); relative POSIX paths; UTF-8 source text with CRLF normalized to LF',
    scope:'global.json; tracked src/**/*.cs, src/**/*.csproj, src/**/*.ts; experiment .mjs/.ts/.cs/.csproj, config.json, package.json and package-lock.json; excludes node_modules, .build, bin, obj, data',
    reproduction:'node experiments/trading/run.mjs regenerates this fingerprint'
},null,2)+'\n');
writeFileSync(path.join(root,'.build/metadata.json'), JSON.stringify(metadata,null,2)+'\n');
await build({entryPoints:[path.join(root,'typescript.ts')], outfile:path.join(root,'.build/typescript.mjs'),
    bundle:true, platform:'node', format:'esm', target:'node24', nodePaths:[path.join(root,'node_modules')],
    tsconfigRaw:{compilerOptions:{useDefineForClassFields:false}} });
const buildResult = spawnSync('dotnet',['build',path.join(root,'CSharp/TradingExperiment.csproj'),'--no-restore','--nologo','-v','quiet'],{encoding:'utf8',cwd:repo});
writeFileSync(path.join(root,'csharp-build.log'), (buildResult.stdout??'')+(buildResult.stderr??''));
if (buildResult.status !== 0) throw Error('C# build failed: see csharp-build.log');
const commands = [
    ['dotnet',[path.join(root,'CSharp/bin/Debug/net10.0/TradingExperiment.dll'), root]],
    [process.execPath,[path.join(root,'.build/typescript.mjs'),root]],
    [process.execPath,[path.join(root,'compare.mjs')]]
];
let previousHashes;
for (let pass=0; pass<(process.argv.includes('--repeat') ? 2 : 1); pass++) {
for (const [command,args] of commands) {
    const result = spawnSync(command,args,{cwd:repo,encoding:'utf8'});
    const output = (result.stdout??'')+(result.stderr??'');
    writeFileSync(path.join(root, command === 'dotnet' ? 'csharp-run.log' : args[0].endsWith('compare.mjs') ? 'compare.log' : 'typescript-run.log'),output);
    console.log(output.slice(-5000));
    if (result.status !== 0) throw Error(`${command} failed with status ${result.status}`);
}
const hashes = ['Trading_CSharp.json','Trading_TypeScript.json'].map(f=>hash(readFileSync(path.join(root,f))));
if (previousHashes && JSON.stringify(hashes)!==JSON.stringify(previousHashes)) throw Error('Repeatability check failed');
previousHashes=hashes;
}
if (process.argv.includes('--repeat')) console.log('Repeatability: both result files are byte-identical across two independent process runs.');

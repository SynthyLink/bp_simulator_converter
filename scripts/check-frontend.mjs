import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const orbital = new URL('../examples/orbital/AspireOnlineConverter/frontend/', import.meta.url);
const trading = new URL('../examples/trading/AspireTradingApp/frontend/', import.meta.url);
const requireTrading = createRequire(new URL('package.json', trading));
const requireOrbital = createRequire(new URL('package.json', orbital));
const ts = requireOrbital('typescript');
function loadSource(url, requireModule = () => { throw Error('Unexpected runtime dependency'); }) {
  const code = ts.transpileModule(readFileSync(url, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  new Function('require', 'exports', code)(requireModule, exports);
  return exports;
}

test('orbital chart adapter aligns existing samples by index and truncates unmatched rows', () => {
  const { createServerClientComparisonData } = loadSource(new URL('src/Visualization/orbitalComparisonData.ts', orbital));
  const server = { orbitalTime: 10, x: 1, y: 2, z: 3, vx: 4, vy: 5, vz: 6 };
  const client = { ...server, orbitalTime: 11, x: 7 };
  const result = createServerClientComparisonData([server, server], [client]);
  assert.equal(result.length, 1);
  assert.equal(result[0].sample, 1);
  assert.equal(result[0].time, 10);
  assert.equal(result[0].serverX, 1);
  assert.equal(result[0].clientX, 7);
  assert.deepEqual(createServerClientComparisonData([], []), []);
});

test('trading server JSON converts to Maps without losing zero or warmup null values', () => {
  // Do not construct a model, data source or numerical runtime. Only call the
  // existing transport adapter on an object with the class prototype.
  const { TradingPerformer } = loadSource(new URL('src/ExternalObjects/Trading/TradingPerformer.ts', trading), () => ({}));
  const adapter = Object.create(TradingPerformer.prototype);
  adapter.setServer([{ a: 0, b: null, c: 1.25, w: 'session' }]);
  assert.equal(adapter.server[0].get('a'), 0);
  assert.equal(adapter.server[0].get('b'), null);
  assert.equal(adapter.server[0].get('c'), 1.25);
  assert.equal(adapter.server[0].get('w'), 'session');
  adapter.setServer(undefined);
  assert.deepEqual(adapter.server, []);
});

test('spreadsheet export returns a readable workbook and handles missing records', async () => {
  const { ReportExcelCreator } = loadSource(new URL('src/xslx/ReportExcelCreator.ts', trading), requireTrading);
  const exporter = new ReportExcelCreator(['a', 'b'], new Map([['a', 'Value'], ['b', 'Warmup']]));
  assert.equal(await exporter.create('Server', undefined), undefined);
  const blob = await exporter.create('Server', [new Map([['a', 0], ['b', null]])]);
  const { Workbook } = requireTrading('exceljs');
  const workbook = new Workbook();
  await workbook.xlsx.load(Buffer.from(await blob.arrayBuffer()));
  assert.equal(workbook.getWorksheet('Report').getCell('A1').value, 'Value');
  assert.equal(workbook.getWorksheet('Report').getCell('A2').value, 0);
  assert.equal(workbook.getWorksheet('Report').getCell('B2').value, null);
});

test('trading default Vite proxy matches the server HTTP launch profile', () => {
  const profile = JSON.parse(readFileSync(new URL('../AspireTradingApp.Server/Properties/launchSettings.json', trading)));
  const config = readFileSync(new URL('vite.config.ts', trading), 'utf8');
  assert.ok(config.includes(`'${profile.profiles.http.applicationUrl}'`));
});

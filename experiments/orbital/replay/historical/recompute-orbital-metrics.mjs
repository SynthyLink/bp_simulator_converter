#!/usr/bin/env node
/**
 * SN Computer Science. Peter Ivankov and Max Shestov.
 * Backend-Frontend Converter: Component-Based Conversion of .NET Computational Models to TypeScript.
 * Corresponding author: Max Shestov, Georgia Institute of Technology, Atlanta, GA, United States; mshestov@gatech.edu.
 * Independent archive analysis; DOES NOT execute or regenerate either model.
 * Node.js standard library only. Input: repository root; output: optional JSON path.
 * node recompute-orbital-metrics.mjs <repository-root> [output.json]
 * The MIME and HTML parsing below are independent of experiments/orbital/check.mjs.
 * Metrics operate on binary64 values parsed from the numbers displayed in MHTML.
 */
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';

assert.ok(process.argv[2], 'Supply repository root');
const root = resolve(process.argv[2]);
const hashes = [
  '909fb98e3c4fcfd3cd78c46fcf73ad07cbb64f731d41566e525d4fd48cf966ee',
  '9d97d4a89928f48ddcece549b0b8e13d4901e522d95404d3fd063269c7bcf025',
  'eb57d9fbc36054c6836a88749f5edb021ca707b41b3baa6d0d68220c361f5e76',
  '5c62c731f3f510a2ac8096c423ccca1d21f2948ceccbdb95c2ca386feb9ff2cb',
];
const reported = [
  ['1.02e-7', '5.32e-8', '1.09e-10', '5.71e-11'],
  ['3.13e-7', '1.04e-7', '3.37e-10', '1.12e-10'],
  ['3.97e-7', '1.48e-7', '4.28e-10', '1.59e-10'],
  ['2.51e-7', '9.70e-8', '2.71e-10', '1.05e-10'],
];
function htmlPart(buffer) {
  const source = buffer.toString('latin1');
  const boundary = source.match(/boundary="([^"]+)"/i)?.[1];
  assert.ok(boundary, 'Missing MIME boundary');
  const parts = source.split('--' + boundary);
  const part = parts.find(p => /^\s*Content-Type: text\/html\s*\r?$/im.test(p));
  assert.ok(part, 'Missing HTML MIME part');
  const split = part.search(/\r?\n\r?\n/);
  assert.ok(split >= 0, 'Missing MIME header separator');
  const headers = part.slice(0, split);
  assert.match(headers, /Content-Transfer-Encoding: quoted-printable/i);
  const body = part.slice(split).replace(/^\r?\n\r?\n/, '');
  const decoded = body.replace(/=\r?\n/g, '').replace(/=([0-9a-f]{2})/gi,
    (_, pair) => String.fromCharCode(Number.parseInt(pair, 16)));
  return Buffer.from(decoded, 'latin1').toString('utf8');
}
function readTables(html) {
  // A token stack isolates the three leaf tables from the surrounding layout table.
  const tables = [];
  const stack = [];
  for (const match of html.matchAll(/<[^>]*>|[^<]+/g)) {
    const token = match[0];
    if (/^<table(?:\s|>)/i.test(token)) {
      const table = { selected: /class="my-table"/.test(token), rows: [], row: null, cell: null };
      stack.push(table);
      if (table.selected) tables.push(table);
    } else if (/^<\/table/i.test(token)) {
      stack.pop();
    } else if (stack.at(-1)?.selected) {
      const table = stack.at(-1);
      if (/^<tr(?:\s|>)/i.test(token)) table.row = [];
      else if (/^<td(?:\s|>)/i.test(token)) table.cell = '';
      else if (/^<\/td/i.test(token)) {
        if (table.row && table.cell !== null) table.row.push(table.cell.trim());
        table.cell = null;
      } else if (/^<\/tr/i.test(token)) {
        if (table.row?.length) table.rows.push(table.row);
        table.row = null;
      } else if (/^<input\s/i.test(token) && table.cell !== null) {
        table.cell += token.match(/\bvalue="([^"]*)"/i)?.[1] ?? '';
      } else if (!token.startsWith('<') && table.cell !== null) table.cell += token;
    }
  }
  assert.equal(stack.length, 0, 'Unbalanced HTML tables');
  assert.equal(tables.length, 3, 'Expected form, server and client tables');
  const inputs = Object.fromEntries(tables[0].rows.filter(row => row.length === 2));
  const records = tables.slice(1).map(table => {
    const result = [];
    for (const [key, text] of table.rows) {
      if (!key) continue;
      if (key === 'Loop') result.push({});
      assert.ok(result.length, 'Data before Loop');
      const record = result.at(-1);
      const value = key === 'Time' ? text : Number(text);
      if (key !== 'Time') assert.ok(text !== '' && Number.isFinite(value), `Invalid ${key}`);
      if (key in record) assert.equal(record[key], value, `Inconsistent duplicated ${key}`);
      record[key] = value;
    }
    assert.equal(result.length, 91);
    result.forEach((record, i) => assert.equal(record.Loop, i + 1));
    return result;
  });
  return { inputs, records };
}
function wallTime(value) {
  const match = value.match(/^(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+) (AM|PM)$/);
  assert.ok(match, `Unexpected displayed time: ${value}`);
  const [, month, day, year, hour, minute, second, period] = match;
  // Only compare displayed fields; the original timezone is not established.
  return Date.UTC(+year, +month - 1, +day, +hour % 12 + (period === 'PM' ? 12 : 0), +minute, +second);
}
const stats = xs => ({ maximum: Math.max(...xs), mean: xs.reduce((a, b) => a + b, 0) / xs.length });
const runs = hashes.map((expectedHash, i) => {
  const file = `orbital-run-${i + 1}.mhtml`;
  const bytes = readFileSync(join(root, 'experiments', 'orbital', file));
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash, expectedHash, `${file}: unexpected archived bytes`);
  const { inputs, records: [server, client] } = readTables(htmlPart(bytes));
  const differences = server.map((a, index) => {
    const b = client[index];
    assert.equal(a.Loop, b.Loop);
    for (const key of ['X', 'Y', 'Z', 'Vx', 'Vy', 'Vz', 'Duration']) {
      assert.ok(Number.isFinite(a[key]) && Number.isFinite(b[key]), `Missing ${key}`);
    }
    const offset = (wallTime(b.Time) - wallTime(a.Time)) / 1000;
    assert.equal(offset, 1);
    return {
      loop: a.Loop,
      positionDifferenceKm: Math.hypot(...['X', 'Y', 'Z'].map(k => a[k] - b[k])),
      velocityDifferenceKmPerSecond: Math.hypot(...['Vx', 'Vy', 'Vz'].map(k => a[k] - b[k])),
      displayedClientOffsetSeconds: offset,
    };
  });
  const position = stats(differences.map(d => d.positionDifferenceKm));
  const velocity = stats(differences.map(d => d.velocityDifferenceKmPerSecond));
  const rounded = [position.maximum, position.mean, velocity.maximum, velocity.mean].map(v => Number(v.toPrecision(3)));
  const valuesMatchManuscript = rounded.every((value, n) => value === Number(reported[i][n]));
  const intervals = server.slice(1).map((r, n) => (wallTime(r.Time) - wallTime(server[n].Time)) / 1000);
  return {
    run: i + 1, file, sha256: hash, hashMatchesSuppliedProvenance: true,
    displayedFormValues: inputs, pairedEvents: server.length,
    alignment: 'Displayed Loop index; NOT identical timestamps',
    displayedClientOffsetSeconds: 1,
    serverInterEventSeconds: { minimum: Math.min(...intervals), maximum: Math.max(...intervals) },
    positionDifferenceKm: position, velocityDifferenceKmPerSecond: velocity,
    withinManuscriptTolerances: position.maximum <= 1e-6 && velocity.maximum <= 1e-9,
    matchesManuscriptThreeSignificantFigures: valuesMatchManuscript,
    lastEventDurationMilliseconds: { server: server.at(-1).Duration, client: client.at(-1).Duration },
    differences,
  };
});
const report = {
  publication: {"articleTitle": "Backend-Frontend Converter: Component-Based Conversion of .NET Computational Models to TypeScript", "journal": "SN Computer Science", "authors": ["Peter Ivankov", "Max Shestov"], "correspondingAuthor": "Max Shestov", "affiliation": "Georgia Institute of Technology, Atlanta, GA, United States", "email": "mshestov@gatech.edu"},
  analysisDate: '2026-10-12',
  kind: 'Independent recomputation from archived displayed numbers; no model rerun',
  originalSnapshotSaveDate: '2026-06-24',
  arithmetic: 'JavaScript binary64; Euclidean norm via Math.hypot; arithmetic mean',
  scope: 'Validates arithmetic and archive identity, not original execution provenance, physical accuracy, runtime correctness or a general conversion guarantee.',
  originalOrbitalBuild: 'Not identified by archived records',
  formValuesCaveat: 'Saved form values are observations, not independently verified run configuration.',
  tolerances: { positionKm: 1e-6, velocityKmPerSecond: 1e-9 },
  runs,
};
if (process.argv[3]) writeFileSync(resolve(process.argv[3]), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, runs: runs.map(({ differences, ...run }) => run) }, null, 2));
assert.ok(runs.every(run => run.matchesManuscriptThreeSignificantFigures), 'Manuscript rounding mismatch');
assert.ok(runs.every(run => run.withinManuscriptTolerances), 'Manuscript tolerance exceeded');

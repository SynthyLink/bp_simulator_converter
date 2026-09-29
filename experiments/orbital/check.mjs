import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Read saved evidence only. Expectations come from the author's unchanged source note.
const read = file => readFileSync(new URL(file, import.meta.url));
const manifest = read('provenance.txt').toString('utf8');
const entries = [...manifest.matchAll(/^(orbital-run-[1-4]\.mhtml): original (.+); SHA-256 ([a-f0-9]{64})\r?$/gm)];
assert.equal(entries.length, 4, 'Expected four archive hashes in provenance.txt');
assert.equal(new Set(entries.map(entry => entry[1])).size, 4);

function savedTables(bytes) {
  const raw = bytes.toString('latin1');
  const part = raw.match(/Content-Type: text\/html\r?\n[\s\S]*?Content-Transfer-Encoding: quoted-printable\r?\n[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n------MultipartBoundary--)/);
  assert.ok(part, 'Expected quoted-printable HTML part in Blink MHTML');
  const decoded = part[1].replace(/=\r?\n/g, '')
    .replace(/=([0-9a-f]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  const html = Buffer.from(decoded, 'latin1').toString('utf8');
  assert.match(html, /<td>Server<\/td><td>Client<\/td>/);
  const tables = [...html.matchAll(/<table class="my-table">([\s\S]*?)<\/table>/g)];
  assert.equal(tables.length, 3, 'Expected input form, server table and client table');
  return tables.slice(1).map(([, table]) => {
    const records = [];
    for (const [, key, value] of table.matchAll(/<tr>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<\/tr>/g)) {
      if (key === 'Loop') records.push({});
      assert.ok(records.length, 'Field precedes first Loop');
      const record = records.at(-1);
      // The archived UI repeats Y; require repeated values to agree.
      if (key in record) assert.equal(record[key], value, `Conflicting ${key}`);
      record[key] = value;
    }
    return records;
  });
}

function displayedTime(value) {
  const match = value.match(/^(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+) (AM|PM)$/);
  assert.ok(match, `Unexpected saved time: ${value}`);
  const [, month, day, year, hour, minute, second, meridiem] = match;
  // UTC arithmetic here only compares displayed wall-clock fields; it does not
  // assert a timezone for the original simulation or browser.
  return Date.UTC(+year, +month - 1, +day, +hour % 12 + (meridiem === 'PM' ? 12 : 0), +minute, +second);
}

for (const [, file, , expectedHash] of entries) {
  const bytes = read(file);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash, `${file}: hash mismatch`);
  const [server, client] = savedTables(bytes);
  for (const records of [server, client]) {
    assert.equal(records.length, 91, `${file}: record count`);
    records.forEach((record, index) => {
      assert.equal(record.Loop, String(index + 1), `${file}: Loop order`);
      for (const key of ['X', 'Y', 'Z', 'Vx', 'Vy', 'Vz', 'Duration']) {
        assert.ok(typeof record[key] === 'string' && record[key].trim() !== '' && Number.isFinite(Number(record[key])), `${file}: invalid ${key}`);
      }
      assert.ok(Number(record.Duration) >= 0, `${file}: negative Duration`);
    });
  }
  server.forEach((record, index) => {
    assert.equal(displayedTime(client[index].Time) - displayedTime(record.Time), 1000, `${file}: time offset at Loop ${record.Loop}`);
  });
  console.log(`${file}: SHA-256 verified; 91 server/client pairs; client displayed times +1 second.`);
}
console.log('Historical archive checks passed; no models executed or results written.');

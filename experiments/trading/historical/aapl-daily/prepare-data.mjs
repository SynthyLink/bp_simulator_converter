// Import one archived Yahoo chart response. Replays never access the network.
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(path.join(root, 'config.json')));
const raw = readFileSync(process.argv[2]);
const chart = JSON.parse(raw).chart;
if (chart.error || chart.result?.length !== 1) throw Error('Invalid chart response');
const result = chart.result[0];
if (result.meta.symbol !== config.symbol || result.meta.dataGranularity !== '1d') throw Error('Wrong symbol/interval');
const quote = result.indicators.quote[0];
const format = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
const bars = result.timestamp.map((time, i) => ({
  date: format.format(new Date(time * 1000)),
  open: quote.open[i], high: quote.high[i], low: quote.low[i], close: quote.close[i], volume: quote.volume[i]
})).filter(b => b.date >= config.startInclusive && b.date < config.endExclusive);
for (const [i, b] of bars.entries()) {
  if (i && bars[i - 1].date >= b.date) throw Error('Unsorted/duplicate dates');
  if (!['open','high','low','close','volume'].every(k => Number.isFinite(b[k]))) throw Error('Missing OHLCV');
  if (b.low > Math.min(b.open,b.close) || b.high < Math.max(b.open,b.close) || b.low > b.high || b.volume < 0) throw Error('Invalid OHLCV');
}
if (!bars.length) throw Error('Empty dataset');
mkdirSync(path.join(root,'data'), { recursive: true });
writeFileSync(path.join(root,'data/AAPL_yahoo_raw.json'), raw);
const normalized = '[\n' + bars.map(b => JSON.stringify(b)).join(',\n') + '\n]\n';
writeFileSync(path.join(root,'data/AAPL_1d.json'), normalized);
const hash = b => createHash('sha256').update(b).digest('hex');
const manifest = {
  provider: 'Yahoo Finance',
  url: 'https://query2.finance.yahoo.com/v8/finance/chart/AAPL?period1=1640995200&period2=1704067200&interval=1d',
  retrievedAtUtc: new Date(process.argv[3] ?? statSync(process.argv[2]).mtime).toISOString(),
  retrievalTimestampBasis: process.argv[3] ? 'Explicit download timestamp' : 'Input file modification time',
  symbol: config.symbol, interval: config.interval, currency: result.meta.currency,
  exchangeTimezone: result.meta.exchangeTimezoneName,
  prices: 'Yahoo quote OHLC (split-adjusted); adjusted-close series is not used; no dividend adjustment or rounding is applied by this experiment',
  dateConversion: 'Provider timestamps converted to America/New_York trading-session dates',
  rawFile: 'data/AAPL_yahoo_raw.json', rawSha256: hash(raw),
  dataFile: 'data/AAPL_1d.json', dataSha256: hash(normalized),
  rowCount: bars.length, firstDate: bars[0].date, lastDate: bars.at(-1).date
};
writeFileSync(path.join(root,'data/source.json'), JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));

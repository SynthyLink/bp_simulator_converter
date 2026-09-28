# AAPL daily C# / TypeScript experiment

This experiment runs the existing AspireTradingApp generated Donchian model in
both runtimes against one frozen OHLCV file. It tests migration equivalence.
The generated formulas are linked/imported from the repository, not rewritten
in the experiment runners.

## Results

`Trading_CSharp.json` and `Trading_TypeScript.json` each contain 501 daily records,
from 2022-01-03 through 2023-12-29, plus reproducibility metadata. Both have 231
buy events and 231 sell events. The records match exactly; the maximum numerical
difference is zero. The requested two-year period was sufficient and was not
extended. `summary.json` contains the automatically calculated comparison.

Every record has a real ISO session date, close, raw model position, buy/sell
event array, execution prices, 10/40-bar moving averages, 10-bar Donchian high/low,
and the original `Order.Income` accumulator. Each record occupies one line for
readability without an oversized export. No rounding is applied before comparison.

Position codes are the existing model's output: `0` = flat, `1` = short,
`2` = long, `null` = not initialized during warmup. An empty `events` array means
neither execution-price measurement was populated. Buy/sell events are derived
from the actual `Order.Buy Price` / `Order.Sell Price` measurements, not inferred
from position changes. A buy can cover a short and a sell can close a long.

## Reproduce

From the repository root, with .NET SDK 10.0.301 and Node.js 24.12.0 available:

```powershell
npm.cmd ci --prefix experiments/trading --ignore-scripts
dotnet restore experiments/trading/CSharp/TradingExperiment.csproj
node experiments/trading/run.mjs --repeat
node --test experiments/trading/tests.mjs
```

On Linux/macOS use `npm` instead of `npm.cmd`. The recorded execution environment
is Windows; other platforms are not tested. The first two commands may need the
package registries. After dependencies are installed, replay uses local files
only. There is no SQL Server, broker, web server or browser requirement.

`--repeat` runs each implementation twice in fresh processes and verifies that
both result files are individually byte-identical across repeats. C# is built
with `--no-restore`; TypeScript is bundled/transpiled using pinned esbuild 0.25.10
and executed in Node. This does not assert that the entire frontend passes `tsc`.
`package-lock.json` pins the experiment's JavaScript dependencies. Metadata also
records resolved NuGet package versions, the .NET runtime/SDK, Node, npm, esbuild,
OS, architecture, commit, branch and source fingerprint.

To compare the existing files without building either implementation:

```powershell
node experiments/trading/compare.mjs
```

The comparison validates input hashes, schema, row count, chronological date/close
alignment, metadata, exact positions/events, null warmup, event prices, and all
numeric fields. Numerical acceptance uses
`abs(a-b) <= 1e-10 + 1e-12 * max(abs(a), abs(b))`; exact equality is reported
separately. It independently recomputes every indicator from the input candles,
so a matching mistake in both implementations can still fail. It writes
`summary.json` and exits nonzero on failure. Tests deliberately inject missing
rows, changed positions/events, incorrect indicators, null/NaN values, metadata
changes and numerical drift. Both runners also test empty/singleton/three-bar
iteration and reset, guarding against the original first-bar omission.

## Data and exact settings

`data/source.json` records the provider URL, retrieval time and SHA-256 hashes.
The source is [Yahoo Finance AAPL history](https://finance.yahoo.com/quote/AAPL/history/),
retrieved through its chart endpoint. `data/AAPL_yahoo_raw.json` archives the
response; `data/AAPL_1d.json` is the single input file read by both implementations.
Session dates are converted using America/New_York. We use the provider's quote
OHLC fields (split-adjusted), not its separately supplied adjusted-close series.
No dividend adjustment, interpolation, rounding or synthetic weekend bars are
introduced. The frozen snapshot is authoritative for replay; a later provider
download may revise historical values.

The importer can be rerun against an archived response explicitly:

```powershell
node experiments/trading/prepare-data.mjs path/to/yahoo-chart-response.json
```

This replaces the frozen fixture and retrieval manifest; normal replay never
runs the importer. A third CLI argument may supply the original download timestamp
in ISO format; otherwise the input file modification time is recorded, with this
basis stated explicitly in the manifest. `config.json` contains the shared settings:

| Setting | Value |
| --- | --- |
| Symbol / interval | AAPL / 1 day |
| Date bounds | 2022-01-01 inclusive, 2024-01-01 exclusive |
| Average Short / Long | 10 / 40 trading bars |
| Donchian High / Low | 10 / 10 trading bars |
| Indicator windows | Trailing windows including the current bar |
| Warmup | Within the requested period; no pre-period candles |
| Initial feedback / income | x=0, y=0, t=0 / 0 |
| Price / quantity | Current close / one-unit model accounting |
| Commission / slippage | 0 / 0 |
| Forced terminal close | None |

The first complete 40-bar window and first event occur on 2022-03-01. The generated
model produces an event on each of the remaining 462 bars for this configuration.
These counts describe the existing model, rather than a newly designed strategy.

## Model scope and changes

The linked C# graph is
`src/Web/AspireTradingApp/AspireTradingApp.Server/GeneratedProject/DonchianDesktop.cs`;
the TypeScript graph is
`src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Algorithms/DonchianDesktop.ts`.
Settings override both graphs at runtime. Graph formulas and order accounting are
unchanged. Only the data-query integration required fixes:

- Both iterators previously advanced past the first candle. They now begin before
  the first element; C# reset rewinds the enumerator and clears its date lookup.
- C# `DataQuery.UsePreaggregatedBars` explicitly bypasses the legacy resampler when
  the provider supplies already aggregated candles. The file adapter supplies
  validated daily bars and honors the same half-open date bounds as TypeScript.
- Export dates come from the actual candle measurement, never a step counter.

`income` intentionally preserves legacy behavior. In particular, the existing
Order code subtracts the short trade's `entry - exit` value from its accumulator,
and its open/closed state toggles on position-type changes. The current model's
position code is therefore not a separately reconstructed brokerage inventory.
The final `income` is -4.209953308105469 and final position code is 1 in both
runtimes. This is evidence of runtime agreement, not a validated profitability
backtest. No strategy/accounting changes were made to improve event counts or
results.

The commit in each result identifies the implementation revision used at run
time, which can precede a later commit containing the outputs. `sourceDirty`
reports changes to implementation/configuration inputs only. `source-manifest.json`
documents the aggregate source fingerprint; it normalizes source line endings
to LF. Data hashes always cover exact saved bytes. The original root `Result.json`
is preserved and is not used by this experiment.

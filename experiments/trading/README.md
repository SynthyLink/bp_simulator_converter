# Trading evidence and checks

`historical/aapl-daily/` preserves 20 experiment files from `trading-xperiment`
at `f40af51ce5e2629a9e26b89cdf036a864209f0b8`. `historical/provenance.json` lists their
original paths and Git blob IDs. Its README/scripts are historical documents:
their paths describe that revision, not this checkout.

The recorded comparison reports 501 daily AAPL bars, 2022-01-03 through 2023-12-29,
231 buy and 231 sell events per implementation, and exact record equality. This
is migration-equivalence evidence, not a validated profitability backtest.
Original accounting semantics and caveats remain in the archived README/notes.

**Currently runnable without packages or services:** from root, with Node.js
24.12.0, run `npm run check:trading`. It verifies archive blob IDs, frozen input
hashes, recomputes the comparison in memory, and runs the branch's 10 existing
tests. It does not overwrite summaries or execute either model.

**Historical model replay:** the harness depends on two branch-only data-query
fixes (first-bar/reset handling and `UsePreaggregatedBars`). They were not applied
to active runtimes because this refactor preserves main's behavior. Do not run
archived `run.mjs` against this checkout. Replay in a separate checkout instead:

```powershell
git worktree add --detach ../bp-trading-replay f40af51ce5e2629a9e26b89cdf036a864209f0b8
cd ../bp-trading-replay
npm.cmd ci --prefix experiments/trading --ignore-scripts
dotnet restore experiments/trading/CSharp/TradingExperiment.csproj
node experiments/trading/run.mjs --repeat
node --test experiments/trading/tests.mjs
```

Use .NET SDK 10.0.301 and Node.js 24.12.0; use `npm` on non-Windows platforms.
The recorded environment is Windows. Restore needs registry access; replay uses
the frozen local dataset without a broker or SQL Server. Replay rewrites outputs
in that separate checkout, with metadata reflecting that run. This procedure is
retained from the branch and was not rerun during the refactor.

`historical/main-run/` contains main's old logs, bundle, metadata and vendored
dependencies unchanged. Do not execute its bundle or use it as the current harness.
`historical/legacy/Result.json` is the former root record; its configuration/date
provenance is insufficient for reproduction. Neither should be relabeled as a
new run or conflated with the AAPL daily results.

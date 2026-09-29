# Verification and remaining limits

Verified on Windows with .NET SDK **10.0.301** and Node.js **24.12.0**.
The migration audit compares against main before the refactor,
`e87e166024aa90854f3621b8bb741ddfbe1c57c1`. No new numerical experiments were
conducted, and no historical results were overwritten.

## Current checks

Run commands from the repository root. On Windows, use `npm.cmd` if PowerShell
blocks `npm.ps1`. The first three checks need no dependency installation.

| Check | Result |
| --- | --- |
| `npm run check:layout` | Accounts for all 9,619 original files, including 458 deliberate retirements; checks project references, preserved source and historical blobs |
| `npm run check:trading` | Archive/input hashes and saved comparison verified; all 10 existing tests pass without model execution |
| `npm run check:orbital` | All four supplied hashes match; each archive contains 91 server/client pairs, aligned Loops and a one-second displayed client-time offset |
| `npm run check:frontend` | Four tests pass: chart data alignment, trading JSON-to-Map conversion, in-memory spreadsheet export and development proxy configuration |
| AspireOnlineConverter frontend production build | Pass: TypeScript and Vite |
| AspireTradingApp frontend production build | Pass: TypeScript and Vite; existing ExcelJS direct-eval warning |
| AspireOnlineConverter.Server build | Pass, with existing dependency/compiler warnings |
| AspireTradingApp.Server build | Pass, with existing dependency/compiler warnings |

Install dependencies and build both current applications using the
[orbital](../examples/orbital/README.md) and
[trading](../examples/trading/README.md) instructions. Then run
`npm run check:frontend`; this additional check uses their installed TypeScript
and ExcelJS dependencies. Its small fixtures exercise adapters and exports,
not generated models. Server builds were verified with
`dotnet build <project> --no-restore -v quiet` after dependencies were restored.
No package versions were changed.

The existing orbital chart UI from `chart-visualization-update` at
`d92b34666db44e8bcb31a9b74fecaae1d37e90ed` was already merged into main.
Its chart component, data adapter, stylesheet and entry point remain byte-identical
to that branch. No additional merge was needed. Trading build corrections retain
strict TypeScript checking, excluding only the unimported, incomplete Immelman
flight export. The active Donchian graph remains checked.

Earlier smoke checks in this work verified the orbital server's health and initial
conditions, both Vite entry pages, and the orbital development proxy. No forecast
request or **Start** action was invoked. Browser interaction and chart rendering
were not visually tested. Trading server startup was not attempted: it loads a
model and requires the configured SQL Server database. Passing archive checks
does not establish that either application reproduces historical experiments.
AppHost entry points are now present, but were not built or launched in this pass.

## Legacy checks and known failures

These outcomes were established earlier in the refactor; the current finishing
pass rebuilt the two Aspire applications above, not every legacy project.

| Check | Recorded result |
| --- | --- |
| Diagram.TypeScript emitter build | Pass |
| BP_Simulator.Light desktop converter build | Pass, with warnings; desktop UI not launched |
| ConsoleTradingTest build | Pass, with warnings; application not executed |
| Standalone TypeScriptLibrary install/build | Pass; temporary emitted files removed afterward |
| `npm run build:orbital` | Targets legacy OnlineGameConverter, not Aspire; same 493 TypeScript diagnostics before and after relocation |
| OnlineGameConverter.Server build | Baseline CS1501: two-argument `GetDesktopAsync` call in `BusinessLogic/TradingStategy/DonchianTradingStrategy.cs:17` |
| Orbital .NET tests | Build blocked by missing `TestCategory.Standard` namespace; no tests executed |
| Legacy orbital frontend lint | 2,463 errors and 220 warnings in existing TS and checked-in JS |

An initial `dotnet test --no-restore` returned zero without executing tests; it
is not counted as a pass. Restoring dependencies exposed the compile failure.
The legacy orbital request route was corrected to `/api/orbital` and verified
with mocked fetch, but its live endpoint remains blocked by server compilation.
The desktop launch profile now uses portable `commandName: "Project"`.

## Preservation audit

`node scripts/check-layout.mjs --details` identifies unresolved legacy reference
occurrences inherited from the base revision. This is a migration audit, not a
claim that the entire repository builds. It checks every original file against
[layout moves](layout-moves.json), with explicit retirement counts and exact
reviewed source hashes in [layout adjustments](layout-adjustments.json).
Retirements cover the aviation app deleted in user cleanup commit `31f8c53c` and
five unused build-cache/temporary files. Its stale solution reference was removed.
Unexpected file losses or changes to other original source/model bytes still fail.

The orbital evidence added in `fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458`
is checked separately. Its original `README.txt` is now `provenance.txt`, with
contents preserved byte-for-byte. The four MHTML files are unchanged. The exact
source build and a verified replay procedure for those runs remain unavailable.
Trading replay requires the archived branch's data-query changes; follow the
[historical instructions](../experiments/trading/README.md) in a separate checkout.
No historical replay, SQL Server connection, deployment or repository-wide build
was performed. The [paper notice](paper/README.md) identifies the historical draft
and fixed code/evidence revisions; a submission manuscript remains to be supplied.

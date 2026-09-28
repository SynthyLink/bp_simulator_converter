# Refactor verification

Base: `e87e166024aa90854f3621b8bb741ddfbe1c57c1`; local branch:
`refactor/repository-layout`. Verified on Windows with .NET SDK 10.0.301 and
Node.js 24.12.0. No models were rerun to create new experimental results.

| Check | Result |
| --- | --- |
| `npm run check:layout` | All 9,619 original files present; 300 projects/solutions and 2,888 reference targets preserved; 37 historical blobs unchanged |
| `npm run check:trading` | Archive/input hashes and saved comparison match; all 10 existing tests pass; no outputs written |
| Diagram.TypeScript emitter build | Pass |
| BP_Simulator.Light desktop converter build | Pass, with existing dependency/compiler warnings |
| AspireTradingApp.Server build | Pass, with warnings |
| ConsoleTradingTest build | Pass, with warnings; application was not executed |
| AspireOnlineConverter.Server build | Pass, with warnings |
| Standalone TypeScriptLibrary `npm ci` then `npm run build` | Pass; newly emitted untracked JS removed after verification |
| Orbital `npm run build:orbital` | Fails with the same 493 TypeScript diagnostics before and after relocation |
| OnlineGameConverter.Server build | Same baseline CS1501: two-argument `GetDesktopAsync` call in `BusinessLogic/TradingStategy/DonchianTradingStrategy.cs:17` |
| Orbital .NET tests | Build blocked by CS0234: missing `TestCategory.Standard` namespace in `StaticExtension.cs:2`; no tests executed |
| Orbital `npm run lint --workspace onlinegameconverter.client` | Fails: 2,463 errors and 220 warnings across existing TS and checked-in JS |

The initial `dotnet test --no-restore` returned zero without executing tests;
it is not counted as a passing check. After restoring dependencies, the compile
failure above was exposed. Initial sandbox NuGet connectivity failures were
resolved by restoring with network access. No package versions were changed.

Builds were run with `dotnet build <project> -v quiet`; the desktop, emitter and
server paths are documented in the converter/example READMEs. The orbital test
command is in `experiments/orbital/README.md`. For the standalone TS library:

```powershell
npm ci --prefix src/runtimes/typescript/TypeScriptLibrary --ignore-scripts --no-audit --no-fund
npm run build --prefix src/runtimes/typescript/TypeScriptLibrary
```

`node scripts/check-layout.mjs --details` lists 57 unresolved legacy reference
occurrences already present at the base revision, largely in old UI/sample
projects. Their targets were preserved; this refactor does not make all legacy
projects buildable. The audit also verifies original source/model bytes and
workspace lock paths. It is specifically an audit of this migration against its
pinned base, not a general test suite for future algorithm changes.

No browser, broker, SQL Server, historical model replay, deployment or full
repository-wide build was attempted. Aspire AppHost scaffolds lack tracked
entry points. Existing embedded runtime copies remain separate; unifying them,
repairing legacy build failures and establishing an orbital replay harness are
follow-up work. Trading replay requires the branch-specific fixes at the archived
revision; see its experiment instructions rather than running archived scripts
against the refactored tree.

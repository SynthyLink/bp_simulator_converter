# Refactor verification

Base: `e87e166024aa90854f3621b8bb741ddfbe1c57c1`; local branch:
`refactor/repository-layout`. Verified on Windows with .NET SDK 10.0.301 and
Node.js 24.12.0. No models were rerun to create new experimental results.

| Check | Result |
| --- | --- |
| `npm run check:layout` | All 9,619 original files present; 300 projects/solutions and 2,888 reference targets preserved; 37 historical blobs unchanged |
| `npm run check:trading` | Archive/input hashes and saved comparison match; all 10 existing tests pass; no outputs written |
| `npm run check:orbital` (after evidence commit `fb8fa694`) | All four supplied hashes match; each archive contains 91 server/client pairs with aligned Loops and a one-second displayed client-time offset; no models executed |
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
pinned base, not a general test suite for future algorithm changes. It predates
the orbital evidence addition; `check:orbital` separately validates those files.
The later finishing pass pins exact corrected contents for two files in the
layout audit: the orbital HTTP request suffix and desktop launch profile. This
keeps the working checks strict without exempting other source changes.

The four historical orbital snapshots and supplied README were added in
`fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458`, after the original refactor verification.
They correct the earlier statement that no paired orbital outputs were available.
Their hashes and saved table structure have now been checked; the original build
verification above was not repeated for this documentation/archive-check update.
The source build used for those historical runs remains unidentified.

## Reviewer-facing finishing pass

The root quick-start now begins with `check:layout`, `check:trading` and
`check:orbital`; all three passed again. The orbital README incorporates the
supplied supplement description and hashes while preserving `README.txt` and
the four snapshots unchanged. A source-traced converter walkthrough and a nearby
[paper version notice](paper/README.md) were added. Neither model execution nor
UI regeneration was performed.

Two operational corrections were verified:

- The orbital client's request suffix is now `/orbital`. Its HTTP helper already
  prefixes `http://localhost:5218/api`, so the final POST matches
  `OrbitalController` at `/api/orbital`. The controller's `HttpPost(Name =
  "forecastfromnumber")` names the route; it does not add a URL suffix. A mocked
  `fetch` check using the actual transpiled client and HTTP helper verified the
  final URL, method, JSON body, abort signal and response handling. The live
  endpoint was not tested because the server still fails compilation.
- The existing `Similation` launch profile now uses `commandName: "Project"`
  instead of an author-specific executable path. JSON structure was checked;
  the desktop converter built successfully with `dotnet build --no-restore`
  and .NET SDK 10.0.301. The desktop UI was not launched.

`npm run build:orbital` again produced exactly the same 493 TypeScript diagnostic
lines as the original baseline. The server build was repeated with `--no-restore`
and still fails with the same CS1501 overload error. These known failures remain
listed separately from the working reviewer checks; no broader application
repairs or dependency updates were made.

No browser, broker, SQL Server, historical model replay, deployment or full
repository-wide build was attempted. Aspire AppHost scaffolds lack tracked
entry points. Existing embedded runtime copies remain separate; unifying them,
repairing legacy build failures and establishing an orbital replay harness are
follow-up work. Trading replay requires the branch-specific fixes at the archived
revision; see its experiment instructions rather than running archived scripts
against the refactored tree.

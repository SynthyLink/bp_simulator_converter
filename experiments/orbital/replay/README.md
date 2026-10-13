# Orbital experiment reproduction package

The supplied `evidence/protocol.json` fixes the four initial conditions, interval, output-count expectation and comparison thresholds. Use it unchanged. The runner records numerical outputs; agreement, timestamps and deliberately altered controls are assessed separately by the analysis script. A completed execution alone is not a passing numerical comparison.

The base is commit `1a20c74b0a981be765f73f6560d43bc9df3a75c6` of <https://github.com/SynthyLink/bp_simulator_converter>. The baseline uses its unchanged TypeScript runtime. The corrected run applies `orbital-timing-fix.patch`; the C# path is unchanged. The baseline executes scenario 1; the C# and corrected browser modes each execute all four scenarios.

Requirements: Git, .NET SDK 10.0.301 (the repository's `global.json`), a supported Node.js installation, npm, Google Chrome and Playwright. The reported replay used Node.js 24.12.0, Chrome 154.0.8037.98 and Playwright 1.62.1. The following commands use PowerShell. Paths are examples and can be replaced with absolute paths of your choice.

## Prepare the checkout and output directory

Run from `experiments/orbital/replay`, the package directory containing this README and the runner. Keep the new output separate from the distributed evidence.

```powershell
$bundle = (Get-Location).Path
git clone https://github.com/SynthyLink/bp_simulator_converter.git replay-checkout
$repo = (Resolve-Path -LiteralPath 'replay-checkout').Path
git -C $repo checkout --detach 1a20c74b0a981be765f73f6560d43bc9df3a75c6
$out = Join-Path $bundle 'replay-output'
New-Item -ItemType Directory -Path $out
Copy-Item -LiteralPath (Join-Path $bundle 'evidence/protocol.json') -Destination (Join-Path $out 'protocol.json')
npm install --no-save --package-lock=false playwright@1.62.1
Push-Location -LiteralPath $repo
dotnet build (Join-Path $repo 'examples/orbital/AspireOnlineConverter/AspireOnlineConverter.Server/AspireOnlineConverter.Server.csproj')
Pop-Location
npm ci --prefix (Join-Path $repo 'examples/orbital/AspireOnlineConverter/frontend') --no-audit --no-fund
```

The runner can instead load an existing Playwright installation using `PLAYWRIGHT_MODULE`, set to the absolute directory containing that module's `package.json`. No bundled browser download is required when the installed Chrome channel is used.

## Start the two execution paths

In a second terminal, set `$repo` to the absolute checkout path and start the freshly built server:

```powershell
Set-Location -LiteralPath $repo
dotnet run --no-build --no-launch-profile --project (Join-Path $repo 'examples/orbital/AspireOnlineConverter/AspireOnlineConverter.Server/AspireOnlineConverter.Server.csproj') --urls http://127.0.0.1:5419
```

In a third terminal, set `$repo` to that same checkout path and start its frontend:

```powershell
npm run dev --prefix (Join-Path $repo 'examples/orbital/AspireOnlineConverter/frontend') -- --host 127.0.0.1 --port 5189 --strictPort
```

Wait for both services to report that they are listening. The replay calls the server endpoint directly and imports the calculation class in the browser from the frontend served by Vite; it does not depend on the React form's current values or proxy configuration.

## Replay the baseline and correction

In the original terminal:

```powershell
node (Join-Path $bundle 'replay-portable.cjs') csharp --repo $repo --out $out
node (Join-Path $bundle 'replay-portable.cjs') baseline --repo $repo --out $out
git -C $repo apply --check (Join-Path $bundle 'orbital-timing-fix.patch')
git -C $repo apply (Join-Path $bundle 'orbital-timing-fix.patch')
```

Stop and restart the frontend using the same command, so the corrected run loads the patched source. Then run:

```powershell
node (Join-Path $bundle 'replay-portable.cjs') corrected --repo $repo --out $out
```

Leave the checkout unchanged while each mode runs. Stop the two local services when finished. Each mode refuses to overwrite existing result files; to repeat an experiment, create a fresh output directory and copy the same protocol into it.

## Configuration and provenance

- `CSHARP_URL`: server origin; default `http://127.0.0.1:5419`.
- `FRONTEND_URL`: frontend base URL; default `http://127.0.0.1:5189/dist/`.
- `CHROME_PATH`: optional absolute Chrome executable path; otherwise Playwright selects its installed `chrome` channel.
- `PLAYWRIGHT_MODULE`: optional absolute Playwright module directory when a normal `require('playwright')` is unavailable.

Each mode writes output records, an environment record and a SHA-256 source manifest. The manifest includes tracked C# and TypeScript source, project/build files, npm manifests and lockfiles, TypeScript configurations, and .NET/NuGet configuration. An extracted source archive without Git uses directory traversal with dependency/build folders excluded. The environment records Git state when available, the protocol and runner hashes, installed Node/npm/.NET versions and browser details. Source and protocol hashes are checked again after execution. Build binaries, installed dependency contents and the operating system are not archived by this manifest; package lockfiles and reported versions document those dependencies. Start the services from the exact checkout supplied to `--repo`.

The distributed corrected browser results were produced by this portable runner. The C# and baseline results were produced with the same calculation calls in the initial execution runner. execution-provenance.json verifies all C# source/project files against the pinned source archive and records the built server hashes. The corrected source manifest and patch identify the four TypeScript file changes. The first and repeated corrected browser passes have identical time and state records in all four scenarios. Durations are retained as raw observations, not benchmark results.


## Recompute the table, plot, and diagnostic checks

From this package directory (these commands regenerate derived summaries and figures):

```powershell
node analyze-replay.cjs evidence
node scheduler-regression.cjs --verify-source --source-root $repo --report scheduler-check.json
python -m pip install matplotlib
python plot-residuals.py evidence
```

The analysis exits with an error if any corrected run fails the retained thresholds, if the baseline fails to expose the timestamp defect, or if a deliberate fault passes. The three negative controls add 2 mm to x, 2 micrometres/s to vx, and 1 second to orbitalTime in separate copies. The raw evidence remains unchanged; only comparison.json, event-residuals.csv and the plotted figure are recomputed.

The scheduler test imports the actual TypeScript modules. On an unmodified checkout, omit --verify-source to reproduce the baseline/candidate comparison with in-memory substitutions only. On the patched checkout, --verify-source tests the source without substitutions. TypeScript must be installed in the frontend directory as above.

The short diagnostic evidence/atmosphere-clock-probe.json records actual graph intermediates and confirms that the tiny configured drag terms do not change the sampled binary64 accelerations. It is diagnostic evidence, not a physical model validation. The two language graphs share a duplicate velocity-to-vector binding; the configured graphs and parameters are retained unchanged.

The `historical/` directory preserves the original snapshots and archive-analysis files for provenance. The reported orbital replay results are in `evidence/`. `SHA256SUMS.json` covers every distributed package file except itself. The package commit identifies this collection; the execution base and patch specified above identify the sources used for the recorded runs.

Run the short probe with `node atmosphere-clock-probe.cjs PATH_TO_PATCHED_CHECKOUT`; it writes a new atmosphere-clock-probe.json beside the script.

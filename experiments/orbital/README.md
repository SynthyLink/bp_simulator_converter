# Historical orbital evidence

For the recorded C#/browser replay, protocol, scripts and full reproduction
package, use [replay/README.md](replay/README.md). This page documents the original
saved web-page snapshots only.

Four historical MHTML snapshots were added in commit
[`fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458`](https://github.com/SynthyLink/bp_simulator_converter/commit/fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458).
The supplied [provenance note](provenance.txt) records the original filenames,
SHA-256 hashes and manuscript metadata associated with those snapshots.

That commit identifies when the evidence entered this repository, **not** the
source build that produced the runs. The snapshots' save-date headers are June 24,
2026. The original `README.txt` is now named `provenance.txt`; its contents and
all four MHTML files are preserved byte-for-byte. This README is the single
current guide; the text note remains an immutable record of the supplied metadata.

| Snapshot | Original filename | C# server records | TypeScript client records |
| --- | --- | --- | --- |
| [Run 1](orbital-run-1.mhtml) | Aspire Starter.mhtml | 91 | 91 |
| [Run 2](orbital-run-2.mhtml) | Aspire Starter1.mhtml | 91 | 91 |
| [Run 3](orbital-run-3.mhtml) | Aspire Starter2.mhtml | 91 | 91 |
| [Run 4](orbital-run-4.mhtml) | Aspire Starter3.mhtml | 91 | 91 |

SHA-256 hashes supplied with the records:

```text
orbital-run-1.mhtml  909fb98e3c4fcfd3cd78c46fcf73ad07cbb64f731d41566e525d4fd48cf966ee
orbital-run-2.mhtml  9d97d4a89928f48ddcece549b0b8e13d4901e522d95404d3fd063269c7bcf025
orbital-run-3.mhtml  eb57d9fbc36054c6836a88749f5edb021ca707b41b3baa6d0d68220c361f5e76
orbital-run-4.mhtml  5c62c731f3f510a2ac8096c423ccca1d21f2948ceccbdb95c2ca386feb9ff2cb
```

Compare the displayed `X`, `Y`, `Z`, `Vx`, `Vy`, `Vz` values by **Loop index**
(1–91), not by displayed timestamp: client times are one second later. State
values show small numerical differences, not exact equality. Duration values are
milliseconds according to the supplied historical description; do not reinterpret
them as a newly measured benchmark. Open MHTML in a browser that supports saved
web archives to inspect the original tables.

From the repository root, with Node.js 24.12.0 and no package installation:

```powershell
npm run check:orbital
```

This read-only check validates the supplied hashes, decodes the saved HTML tables,
checks both sets of 91 records, Loop alignment, finite state/duration fields and
the displayed one-second offset. It does not run either model, write results,
reconstruct Table 5 or impose a new numerical acceptance tolerance.

**Original snapshot provenance:** saved C#/TypeScript output pairs are available, but the
exact original source build and a verified replay procedure remain unavailable.
No pinned replay harness accompanies these records. Saved form values are not a verified
execution configuration. These are historical outputs, not a guarantee of exact
replay with the current applications. The separate [replay package](replay/README.md) provides the protocol and records of the pinned C#/browser experiment.

Applications live in `examples/orbital/OnlineGameConverter/` and
`examples/orbital/AspireOnlineConverter/`; `docs/paper/` contains a historical
manuscript draft. The supplied README's reference to Table 5 does not establish
that this draft is the corresponding paper revision.

Invoke existing .NET checks from the repository root:

```powershell
dotnet test src/runtimes/dotnet/DynamicLinkLibraries/TestCategory/TestProjectOrbitalExamples/TestProjectOrbitalExamples.csproj
```

This exercises .NET tests, not a cross-runtime comparison, and requires restoring
transitive dependencies. See [verification](../../docs/verification.md) for actual
results and blockers. For the current Aspire application's build and startup
commands, follow [orbital application instructions](../../examples/orbital/README.md).
The root `npm run build:orbital` targets the legacy OnlineGameConverter frontend
and still fails. The archive check above is not a live orbital parity test.

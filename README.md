# Backend–Frontend Converter

Component-based migration of .NET computational models to TypeScript and other
targets, with orbital and trading examples in one repository.

| Location | Purpose |
| --- | --- |
| `src/converter/` | Desktop model editor and code generators |
| `src/runtimes/` | .NET libraries, standalone TypeScript runtime, Python library |
| `examples/orbital/` | Orbital applications and generated docking models |
| `examples/trading/` | Trading applications and generated models |
| `experiments/` | Historical outputs, provenance and read-only evidence checks |
| `docs/` | Architecture, generated-code inventory, verification and paper notice |

## Start with the checks

From the repository root, with Git, Node.js **24.12.0** and npm:

```powershell
npm run check:layout
npm run check:trading
npm run check:orbital
```

These checks need no package installation, .NET SDK, database or running app.
They validate the layout and saved evidence; they do not run experiments.
On Windows, use `npm.cmd` in place of `npm` if PowerShell blocks `npm.ps1`.

## Build and run the applications

The maintained browser examples are **AspireOnlineConverter** (orbital) and
**AspireTradingApp** (trading). Both frontends and .NET servers pass the builds
described in [verification](docs/verification.md). Use .NET SDK **10.0.301**.

- [Orbital instructions](examples/orbital/README.md): install, build and start the
  server and frontend, including the existing server/client comparison charts.
- [Trading instructions](examples/trading/README.md): install, build and configure
  SQL Server before starting the application.
- [Converter walkthrough](src/converter/README.md): an existing model, Generate
  action, generated TypeScript and runtime dependencies.

The older `OnlineGameConverter` remains the root npm workspace.
`npm run build:orbital` targets that **legacy** application and still has known
build failures; it is not the Aspire orbital build command. Other legacy projects
also have unresolved dependencies. See the verification report for exact limits.

Read [architecture](docs/architecture.md), [generated code](docs/generated-code.md),
[experiment instructions](experiments/README.md), and the
[paper version notice](docs/paper/README.md). No new numerical results were produced.

MIT — see [LICENSE](LICENSE).

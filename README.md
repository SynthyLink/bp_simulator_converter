# Backend–Frontend Converter

Component-based migration of .NET computational models to TypeScript and other
targets, with orbital and trading examples in one repository.

| Location | Purpose |
| --- | --- |
| `src/converter/` | Model editor hosts and code generators |
| `src/runtimes/` | .NET libraries, standalone TypeScript runtime, Python library |
| `examples/orbital/` | Orbital web apps and generated docking models |
| `examples/trading/` | Trading web, console and desktop apps; generated models |
| `experiments/orbital/` | Historical result snapshots, provenance and validation |
| `experiments/trading/` | Historical outputs, data, harness and provenance |
| `docs/` | Architecture, generated-code inventory, verification and paper sources |

## Start with the checks

From a Git checkout, with Git installed, use Node.js **24.12.0** and npm. These checks need no .NET
SDK, package installation, database or running application:

```powershell
npm run check:layout
npm run check:trading
npm run check:orbital
```

They audit the layout and archived evidence without rerunning the models.
See the [converter walkthrough](src/converter/README.md) for an existing
source-model → generator → generated-code → runtime path.

## Application builds and current status

Application builds require .NET SDK **10.0.301** (`global.json`) and their package
dependencies. The desktop converter, Diagram.TypeScript emitter, standalone
TypeScript runtime, Aspire orbital/trading servers and trading console passed
the recorded builds; see [commands and verification](docs/verification.md).

The root orbital example currently **does not build**: its frontend reports 493
TypeScript diagnostics, and its server has a `GetDesktopAsync` overload error.
Both failures predate the folder refactor. To inspect those builds:

```powershell
npm ci
npm run build:orbital
dotnet build examples/orbital/OnlineGameConverter/OnlineGameConverter.Server/OnlineGameConverter.Server.csproj
```

After those failures are resolved, start the server with:

```powershell
dotnet run --project examples/orbital/OnlineGameConverter/OnlineGameConverter.Server --launch-profile http
```

In a second terminal, run `npm run dev --workspace onlinegameconverter.client`.
Configured addresses: `http://localhost:5218` and `https://localhost:57169`.

Read [architecture](docs/architecture.md), [generated code](docs/generated-code.md)
and [experiment instructions](experiments/README.md) before regenerating outputs.
The [paper version notice](docs/paper/README.md) distinguishes the historical
draft, fixed evidence commits and the still-pending submission revision.
Other legacy applications remain under `src/`; not all are supported build targets.

MIT — see [LICENSE](LICENSE).

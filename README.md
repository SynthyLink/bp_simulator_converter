# Backend–Frontend Converter

Component-based migration of .NET computational models to TypeScript and other
targets, with orbital and trading examples in one repository.

| Location | Purpose |
| --- | --- |
| `src/converter/` | Model editor hosts and code generators |
| `src/runtimes/` | .NET libraries, standalone TypeScript runtime, Python library |
| `examples/orbital/` | Orbital web apps and generated docking models |
| `examples/trading/` | Trading web, console and desktop apps; generated models |
| `experiments/orbital/` | Validation instructions and evidence limitations |
| `experiments/trading/` | Historical outputs, data, harness and provenance |
| `docs/` | Architecture, generated-code inventory, verification and paper sources |

Use .NET SDK **10.0.301** (`global.json`) and Node.js **24.12.0**. From root:

```powershell
npm ci
npm run build:orbital
dotnet build examples/orbital/OnlineGameConverter/OnlineGameConverter.Server/OnlineGameConverter.Server.csproj
npm run check:layout
npm run check:trading
```

The orbital builds have existing failures; see [verification](docs/verification.md).
Once resolved, start the server with:

```powershell
dotnet run --project examples/orbital/OnlineGameConverter/OnlineGameConverter.Server --launch-profile http
```

In a second terminal, run `npm run dev --workspace onlinegameconverter.client`.
Configured addresses: `http://localhost:5218` and `https://localhost:57169`.

Read [architecture](docs/architecture.md), [generated code](docs/generated-code.md)
and [experiment instructions](experiments/README.md) before regenerating outputs.
Other legacy applications remain under `src/`; not all are supported build targets.

MIT — see [LICENSE](LICENSE).

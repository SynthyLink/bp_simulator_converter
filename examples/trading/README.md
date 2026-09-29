# Trading applications

`AspireTradingApp/` contains the current web server/frontend and generated
Donchian model. `ConsoleTradingTest/`, `desktop/` and `generated/` retain the
existing console, desktop and generated projects.

From the repository root, with .NET SDK 10.0.301 and Node.js 24.12.0:
use `npm.cmd` instead of `npm` if PowerShell blocks scripts.

```powershell
npm ci --prefix examples/trading/AspireTradingApp/frontend --ignore-scripts
npm run build --prefix examples/trading/AspireTradingApp/frontend
dotnet build examples/trading/AspireTradingApp/AspireTradingApp.Server/AspireTradingApp.Server.csproj
```

Builds do not require a database. **Server startup does:** it loads the existing
model and opens the configured SQL Server database through
`ConnectionStrings:Trading`. Supply your existing trading database configuration;
this repository does not provision it. In PowerShell, set the process environment
variable `ConnectionStrings__Trading` to your connection string, then run:

```powershell
dotnet run --project examples/trading/AspireTradingApp/AspireTradingApp.Server --launch-profile http
```

In a second terminal at the repository root:

```powershell
npm run dev --prefix examples/trading/AspireTradingApp/frontend -- --port 5174 --strictPort
```

Open **http://localhost:5174/dist/**. The development proxy targets the backend
HTTP profile at **http://localhost:5565** (or the `SERVER_HTTP`/`SERVER_HTTPS`
environment override). An Aspire AppHost entry point is also present.

The frontend retains main's existing trading charts. Its strict TypeScript build
excludes only the unused, incomplete `Algorithms/Immelman.ts` flight export;
the active Donchian graph is still checked. Runtime formulas and accounting were
not rewritten. These applications are separate from the frozen-file historical
harness; do not use them to overwrite archived results.

See [offline evidence checks](../../experiments/trading/README.md) and
[verification limits](../../docs/verification.md). No trading model was executed
or SQL Server contacted during the current verification.

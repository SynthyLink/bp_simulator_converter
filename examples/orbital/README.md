# Orbital applications

Use **AspireOnlineConverter** for the current orbital UI. Its chart components,
data adapter, theme and entry point retain the updates from
`chart-visualization-update` (`d92b34666db44e8bcb31a9b74fecaae1d37e90ed`),
already merged into main before the folder refactor. There is no separate branch
named `chart-virtualization` in the inspected remote.

From the repository root, with .NET SDK 10.0.301 and Node.js 24.12.0:
use `npm.cmd` instead of `npm` if PowerShell blocks scripts.

```powershell
npm ci --prefix examples/orbital/AspireOnlineConverter/frontend
npm run build --prefix examples/orbital/AspireOnlineConverter/frontend
dotnet build examples/orbital/AspireOnlineConverter/AspireOnlineConverter.Server/AspireOnlineConverter.Server.csproj
```

Start the server in one terminal:

```powershell
dotnet run --project examples/orbital/AspireOnlineConverter/AspireOnlineConverter.Server --launch-profile http
```

In a second terminal, also at the repository root:

```powershell
npm run dev --prefix examples/orbital/AspireOnlineConverter/frontend -- --port 5173 --strictPort
```

Open **http://localhost:5173/dist/**. The development proxy sends `/api` to
the server at **http://localhost:5408**. Initial conditions load on startup;
**Start** invokes a new server/client calculation. The comparison charts show
those current results, not the archived MHTML runs. No Start action was invoked
during this refactor's verification. Stop each process with Ctrl+C.

An Aspire AppHost entry point is also present; the independent server/frontend
commands above avoid requiring the Aspire dashboard or container orchestration.

`OnlineGameConverter/` is the older root npm workspace and retains its documented
build failures and mixed trading routes. `generated/SpaceCraft.Docking/` holds
generated models. See [generated code](../../docs/generated-code.md),
[historical evidence](../../experiments/orbital/README.md) and
[verification](../../docs/verification.md).

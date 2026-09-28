# Trading applications

`AspireTradingApp/` contains the web server/frontend and generated Donchian graph;
`ConsoleTradingTest/` is the existing console host; `desktop/` contains legacy
desktop applications. `generated/` holds the standalone generated projects.
These applications use their existing database/broker configuration. They are
not the frozen-file experiment harness and should not be used to overwrite it.

From the repository root:

```powershell
dotnet build examples/trading/AspireTradingApp/AspireTradingApp.Server/AspireTradingApp.Server.csproj
```

The frontend has its own package/lock files and is not part of the root orbital
npm workspace. The AppHost project is a scaffold with no tracked entry point.
See [historical evidence and offline checks](../../experiments/trading/README.md).

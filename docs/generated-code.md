# Generated code and source models

Treat these as checked-in model/code-generation snapshots, not converter implementation:

- `examples/trading/AspireTradingApp/AspireTradingApp.Server/GeneratedProject/DonchianDesktop.cs`
  and `frontend/src/ExternalObjects/Trading/Algorithms/DonchianDesktop.ts` in that app.
- `examples/trading/ConsoleTradingTest/GeneratedProject/` (also contains original
  `.business_analisys` model inputs), and `examples/trading/generated/`.
- `examples/orbital/OnlineGameConverter/OnlineGameConverter.Server/BusinessLogic/Orbital/OrbitalForecastCalculator.cs`
  and `onlinegameconverter.client/src/Algorithms/OrbitalForecastCalculation/OrbitalForecast.ts`.
- `examples/orbital/generated/`, and model graphs embedded in other orbital apps
  and standalone runtime examples.
- Legacy `src/Generated/`, `src/Python/Python.Generated/` and `Java_Generated/`.
  Some legacy folders mix generated libraries with handwritten hosts.

Adjacent `.js`/`.js.map` files paired with `.ts` are checked-in TypeScript output;
resource designer files are also generated. They are preserved here. The trading
historical `.build/typescript.mjs` is an archived bundle, not a canonical runtime.
Experiment JSON, logs and manifests are recorded outputs.

No model graph or experimental output was regenerated. There is no verified
one-command model-to-all-targets regeneration pipeline in this checkout. Preserve
model inputs, generator revision and settings in a future regeneration; folder
names alone do not establish provenance.

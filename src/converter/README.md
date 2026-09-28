# Converter

`generators/` contains language-specific emitters; `BP_Simulator/` contains desktop
editor/hosts. Both depend on `../runtimes/dotnet/`. A small emitter build, from root:

```powershell
dotnet build src/converter/generators/DynamicLinkLibraries/Diagram/Diagram.TypeScript/Diagram.TypeScript.csproj
```

Desktop projects require Windows and their existing UI/SDK dependencies.
See [architecture](../../docs/architecture.md) for retained mixed-purpose libraries.

## Walkthrough: FeedBackFormula model to TypeScript

This is an existing small example, traced through the checked-in model, UI handler,
emitter and generated code. The UI generation was not rerun for this documentation
pass, and the current emitter is not asserted to reproduce the old snapshot byte
for byte.

1. On Windows, launch the desktop converter from the repository root:

   ```powershell
   dotnet run --project src/converter/BP_Simulator/BP_Simulator.Light/BP_Simulator.Light --launch-profile Similation
   ```

   Use **File → Open** to load
   [`FeedBackFormula.business_analisys`](../runtimes/typescript/TypeScriptLibrary/src/Tests/FeedBackFormula.business_analisys).
   The adjacent generated example contains objects `X`, `Y`, `Chart` and their
   measurement links.
2. Under **Wizards**, choose **Directory of generated files** (an existing scratch
   directory), set **Class name** to `FeedBackFormula`, select **Language → TS**,
   and leave **Static class** unchecked. Clear the additional-language selection
   if set. Click the top-level **Generate** command. It writes
   `FeedBackFormula.ts` in the selected directory; keep the checked-in snapshot
   intact for comparison.
3. The entry point is `generateToolStripMenuItem_Click` in
   [`FormMain.cs`](../runtimes/dotnet/DynamicLinkLibraries/BasicEngineeringUIFactory/BasicEngineeringUIFactory.Advanced/Forms/FormMain.cs).
   It serializes the open graph, loads a `PureDesktopPeer`, selects
   `StaticExtensionDiagramUI.DesktopCreators["TS"]`, and calls
   `CreateCode(d, "GeneratedProject", "FeedBackFormula", false)`.
   [`DesktopCodeCreator`](generators/DynamicLinkLibraries/Diagram/Diagram.TypeScript/DesktopCodeCreator.cs)
   emits the graph class and delegates each component's code to registered
   language emitters. `StaticExtensionDiagramTypeScript` registers the TS emitter.
4. Inspect the existing
   [`FeedBackFormula.ts`](../runtimes/typescript/TypeScriptLibrary/src/Tests/FeedBackFormula.ts)
   for the resulting model structure. Its imports link `Desktop`, `AliasName`,
   `DataLink`, `DataConsumer` and `VectorFormulaConsumer` to the adjacent
   [`src/Library`](../runtimes/typescript/TypeScriptLibrary/src/Library/).
   The emitter writes class bodies; the checked-in example also includes import
   wiring. Integrating newly emitted code requires matching those imports to the
   chosen runtime version, not treating the output as a standalone executable.
5. The existing
   [`FeedBackFormulaAct.ts`](../runtimes/typescript/TypeScriptLibrary/src/Tests/Wrappers/FeedBackFormulaAct.ts)
   shows how a host supplies `Motion6DFactory` and `DataRuntimeConsumerODE`, then
   calls `PerformerMeasuremets.performFixedStepCalculation`. This is the runtime
   dependency and invocation example, not a new result or a claim of automated
   regeneration parity.

# Converter

`generators/` contains language-specific emitters; `BP_Simulator/` contains desktop
editor/hosts. Both depend on `../runtimes/dotnet/`. A small emitter build, from root:

```powershell
dotnet build src/converter/generators/DynamicLinkLibraries/Diagram/Diagram.TypeScript/Diagram.TypeScript.csproj
```

Desktop projects require Windows and their existing UI/SDK dependencies.
See [architecture](../../docs/architecture.md) for retained mixed-purpose libraries.

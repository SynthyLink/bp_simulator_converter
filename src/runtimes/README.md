# Shared runtime sources

- `dotnet/DynamicLinkLibraries/`: graph, measurement, numerical and supporting libraries.
- `dotnet/ExternalLibraries/`: domain implementations and external-system adapters.
- `typescript/TypeScriptLibrary/`: standalone TypeScript library and existing examples.
- `python/lib/`: Python runtime modules.

Web apps retain version-specific embedded runtime copies; see
[architecture](../../docs/architecture.md). They have not been silently unified.

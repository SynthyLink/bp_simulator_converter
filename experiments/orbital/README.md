# Orbital validation

Applications live in `examples/orbital/OnlineGameConverter/` and
`examples/orbital/AspireOnlineConverter/`; the historical manuscript is in
`docs/paper/`. No standalone, provenance-backed orbital C#/TypeScript output pair
or pinned replay harness was found. The paper and UI are not a substitute for one.
No new numerical results were generated during this refactor.

Invoke existing .NET checks from the repository root:

```powershell
dotnet test src/runtimes/dotnet/DynamicLinkLibraries/TestCategory/TestProjectOrbitalExamples/TestProjectOrbitalExamples.csproj
```

This exercises .NET tests, not a cross-runtime comparison, and requires restoring
transitive dependencies. See [verification](../../docs/verification.md) for actual
results and blockers. `npm run build:orbital` checks the frontend; there is no root
automated orbital parity command. Browser comparison requires working app builds
and the existing server connection settings.

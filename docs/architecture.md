# Repository boundaries

`src/converter/generators/` contains existing language-specific emitter projects,
retaining their grouping and assembly names. `src/converter/BP_Simulator/` contains
the desktop editor/host. Despite their names, OnlineGameConverter and
AspireOnlineConverter expose orbital calculations, so they live in `examples/orbital/`.

`src/runtimes/dotnet/` holds the DynamicLinkLibraries and ExternalLibraries trees:
graph execution, measurements, numerical processing and domain adapters. It also
retains UI, persistence, test and compiler infrastructure intertwined with those
libraries. Some C# emitter helpers remain embedded in these assemblies. Splitting
assemblies or changing namespaces is outside this structural refactor.

`src/runtimes/typescript/TypeScriptLibrary/` is the standalone TypeScript project;
`src/runtimes/python/lib/` is the Python library. Web examples retain their existing
embedded `src/Library` snapshots. These copies are not assumed interchangeable:
deduplication needs a separate behavioral audit. No new runtime copies were created.

Dependencies mostly run examples → runtimes and generators → runtimes. Some
desktop/runtime UI projects also reference emitters: this is a directory separation,
not a claim that the old assembly graph is acyclic. Relative project/solution
references were recalculated without changing assembly identities, package
versions, formulas, controllers or numerical algorithms.

Unrelated legacy applications, samples, third-party sources, alternative frontends
and Java/Python generated snapshots remain at their original locations.
`docs/layout-moves.json` lists old/new prefixes, most specific first, and the base
commit. After committing, `git log --follow -- <new-path>` follows individual moves.
Paper sources moved unchanged from `tex/` to `docs/paper/`; this is a historical
draft, not a reproducibility manifest.

The trading branch was inspected at `f40af51ce5e2629a9e26b89cdf036a864209f0b8`
(merge base `1a16a9f9fe35f5f45f806a185c940f1c91da1f80`). Only its 20 experiment files
were imported, byte-for-byte, under `experiments/trading/historical/aapl-daily/`.
Its two data-query changes were not merged: they change first-bar/reset behavior
and add a preaggregated-bar option. Main's logs, bundle, metadata and vendored
experiment dependencies moved intact to `historical/main-run/`; these describe
an old environment, not dependencies to install or execute. Root `Result.json`
moved unchanged to `historical/legacy/Result.json`. It has insufficient provenance
and is not the AAPL daily fixture.

# Paper version and citation status

**`software_migration.tex` is an older historical draft, not the submission
version.** Its accompanying `svjour.cls` and `svglobal.clo` are retained unchanged.
No submission manuscript or accepted-paper identifier has been supplied in this
checkout. Do not infer that this draft contains the Table 5 referenced by the
orbital supplement.

Fixed repository anchors currently available:

| Material | Immutable reference |
| --- | --- |
| Folder refactor | [07b6b29b2a38f3ee38c4d5a02f086279b23a19bf](https://github.com/SynthyLink/bp_simulator_converter/commit/07b6b29b2a38f3ee38c4d5a02f086279b23a19bf) |
| Orbital supplement addition | [fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458](https://github.com/SynthyLink/bp_simulator_converter/tree/fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458/experiments/orbital) |
| Historical trading experiment implementation | [f40af51ce5e2629a9e26b89cdf036a864209f0b8](https://github.com/SynthyLink/bp_simulator_converter/tree/f40af51ce5e2629a9e26b89cdf036a864209f0b8/experiments/trading) |

These identify repository/evidence revisions, not the missing original orbital
build or a final publication release. The current reviewer-facing fixes are not
yet included in those commits. Once the submission manuscript and finishing
changes are committed, cite that full commit SHA (or an immutable release/archive)
in the submission and record its identifier here. No publication version or
release has been assigned on the authors' behalf.

Current supplementary instructions use the refactored paths:

- [Orbital evidence](../../experiments/orbital/README.md): four MHTML files under
  `experiments/orbital/`; run `npm run check:orbital` from the repository root.
- [Trading evidence](../../experiments/trading/README.md): records under
  `experiments/trading/historical/`; run `npm run check:trading` from root.
- [Converter walkthrough](../../src/converter/README.md): source model, Generate
  action, emitted TypeScript and runtime dependencies.
- [Verification](../verification.md): working checks and remaining build failures.

Historical README files and recorded paths stay unchanged for provenance. Follow
the current Markdown experiment guides for this checkout; their historical replay
sections explicitly identify when an older checkout is required.

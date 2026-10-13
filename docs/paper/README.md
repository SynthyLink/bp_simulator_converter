# Paper version and citation status

**`software_migration.tex` is an older historical draft, not the submission
version.** Its accompanying `svjour.cls` and `svglobal.clo` are retained unchanged.
No submission manuscript or accepted-paper identifier has been supplied in this
checkout. Do not infer that this draft contains the Table 5 referenced by the
orbital supplement.

The [orbital reproduction package](../../experiments/orbital/replay/README.md)
contains the experimental protocol, raw results, analysis scripts and source
provenance for the C#/browser comparisons. Its README identifies the execution
base and patch separately from the commit used to distribute the package.

Fixed repository anchors currently available:

| Material | Immutable reference |
| --- | --- |
| Orbital execution base (apply the package patch as documented) | [1a20c74b0a981be765f73f6560d43bc9df3a75c6](https://github.com/SynthyLink/bp_simulator_converter/tree/1a20c74b0a981be765f73f6560d43bc9df3a75c6) |
| Maintained code and orbital replay | [4271c883000e4b70a8d44073210feaceadc5d49b](https://github.com/SynthyLink/bp_simulator_converter/tree/4271c883000e4b70a8d44073210feaceadc5d49b) |
| Folder refactor | [07b6b29b2a38f3ee38c4d5a02f086279b23a19bf](https://github.com/SynthyLink/bp_simulator_converter/commit/07b6b29b2a38f3ee38c4d5a02f086279b23a19bf) |
| Orbital supplement addition | [fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458](https://github.com/SynthyLink/bp_simulator_converter/tree/fb8fa694d2a2d3fbeeb1a061dbc0bd3e36469458/experiments/orbital) |
| Historical trading experiment implementation | [f40af51ce5e2629a9e26b89cdf036a864209f0b8](https://github.com/SynthyLink/bp_simulator_converter/tree/f40af51ce5e2629a9e26b89cdf036a864209f0b8/experiments/trading) |

These references distinguish the maintained implementation, the replay execution
base and the original historical records. They are not publication identifiers.
The historical manuscript files in this directory remain unchanged.

Experiment instructions:

- [Orbital reproduction package](../../experiments/orbital/replay/README.md):
  protocol, raw outputs, analysis scripts and full reproduction instructions.
- [Historical orbital evidence](../../experiments/orbital/README.md): four MHTML files under
  `experiments/orbital/`; run `npm run check:orbital` from the repository root.
- [Trading evidence](../../experiments/trading/README.md): records under
  `experiments/trading/historical/`; run `npm run check:trading` from root.
- [Converter walkthrough](../../src/converter/README.md): source model, Generate
  action, emitted TypeScript and runtime dependencies.
- [Verification](../verification.md): working checks and remaining build failures.

Historical README files and recorded paths stay unchanged for provenance. Follow
the current Markdown experiment guides for this checkout; their historical replay
sections explicitly identify when an older checkout is required.

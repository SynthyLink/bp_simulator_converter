# Experimental evidence

[Orbital](orbital/README.md) contains four historical server/client result snapshots,
their supplied provenance and a read-only archive check, plus replay limitations.
[Trading](trading/README.md) separates archived records from procedures that can
be checked now. Applications live in `examples/`; no new experiments were added.

Historical files are immutable records. Do not update their commit IDs, source
fingerprints, recorded paths or numerical results to make them look current.
Write future results separately with new provenance.

See the [paper version notice](../docs/paper/README.md) for fixed repository
anchors and the distinction between the historical draft and a submission version.

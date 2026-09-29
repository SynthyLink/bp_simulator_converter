# Orbital frontend

React/TypeScript orbital example with the existing server/client comparison charts.
See [orbital application instructions](../../README.md) for prerequisites, build
commands, ports and startup. Run commands there from the repository root.

This package has its own lockfile and is not the legacy root npm workspace.
`npm run build` performs strict TypeScript checking followed by Vite bundling;
`npm run dev` starts Vite. Neither command executes an orbital calculation.

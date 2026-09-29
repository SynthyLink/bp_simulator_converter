# Trading frontend

React/TypeScript trading example with the existing charts and spreadsheet export.
See [trading application instructions](../../README.md) for build commands,
SQL Server prerequisites, ports and startup. Run those commands from repository root.

This package has its own lockfile. `npm run build` performs strict TypeScript
checking followed by Vite bundling; `npm run dev` starts Vite. The active trading
graph is checked; the unused incomplete Immelman flight export is excluded.

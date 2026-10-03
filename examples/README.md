# Examples

One app per framework (Stockbreak Markets page + app shell, light and dark). Each installs Edmi through the
shadcn CLI only, never from `packages/*`.

| Example | Install |
| --- | --- |
| `react` | `examples/install.sh react` |
| `vue` | `examples/install.sh vue` |
| `svelte` | `examples/install.sh svelte` (`bash scripts/smoke/example-svelte.sh`) |

`EDMI_URL` (default `http://localhost:4321/edmi-ui`, the docs dev server) must serve `/r/<framework>/*.json`.
Smoke tests: `bash scripts/smoke/example-<framework>.sh`.

Each example is a standalone app (no `workspace:` dependencies): copy a folder out of the repo and run
`npm install && npm run dev` (or pnpm, yarn, bun). `install.sh` takes `PM=npm|pnpm|yarn|bun` (default `bun`) to
choose which package manager runs the shadcn CLI, e.g. `PM=pnpm examples/install.sh react`.

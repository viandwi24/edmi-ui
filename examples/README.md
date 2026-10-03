# Examples

Two apps per framework: Stockbreak Markets (page + app shell) and Layerbeat (Create a BeatVPS, theme
Slate · Ocean with a scoped always-dark sidebar). Light and dark. Each installs Edmi through the shadcn CLI
only, never from `packages/*`.

| Example | Install |
| --- | --- |
| `react` | `examples/install.sh react` |
| `vue` | `examples/install.sh vue` |
| `svelte` | `examples/install.sh svelte` (`bash scripts/smoke/example-svelte.sh`) |
| `layerbeat-react` | `EXAMPLE_DIR=examples/layerbeat-react examples/install.sh react`, then `shadcn add @edmi-ui/theme-slate-ocean --overwrite` |
| `layerbeat-vue` | `EXAMPLE_DIR=examples/layerbeat-vue examples/install.sh vue`, then `shadcn-vue add @edmi-ui/theme-slate-ocean --overwrite` |
| `layerbeat-svelte` | `EXAMPLE_DIR=examples/layerbeat-svelte examples/install.sh svelte`, then `shadcn-svelte add <EDMI_URL>/r/svelte/theme-slate-ocean.json --overwrite` |

`EDMI_URL` (default `http://localhost:4321/edmi-ui`, the docs dev server) must serve `/r/<framework>/*.json`.
Smoke tests: `bash scripts/smoke/example-<framework>.sh` and `bash scripts/smoke/example-layerbeat-<framework>.sh`.

Each example is a standalone app (no `workspace:` dependencies): copy a folder out of the repo and run
`npm install && npm run dev` (or pnpm, yarn, bun). `install.sh` takes `PM=npm|pnpm|yarn|bun` (default `bun`) to
choose which package manager runs the shadcn CLI, e.g. `PM=pnpm examples/install.sh react`.

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

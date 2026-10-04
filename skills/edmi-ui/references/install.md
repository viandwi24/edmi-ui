# Installing Edmi UI

Edmi is a registry, not an npm component package. The framework's shadcn CLI copies component source into the project; the user owns the files.

Commands below use `npx`. Swap it for the project's manager: `pnpm dlx`, `yarn dlx`, `bunx` (use `bunx --bun` for `shadcn-svelte`). Run non-interactively when possible (`--yes`, `--overwrite`) and never leave a CLI waiting on a prompt.

Registry base URL (latest): `https://viandwi24.github.io/edmi-ui/r/<framework>/{name}.json`, framework = `react`, `vue` or `svelte`.

## Which items to install

| Item | What it is |
| --- | --- |
| `theme` | Tokens, Tailwind v4 theme map, fonts, base layer. Install first, always. |
| `all` | Every UI component. Not patterns, not AI. |
| `patterns` | Every ✦ pattern block (headers, stat tiles, tickers, feeds, pricing, kanban, footer). |
| `ai-all` | Every AI component, into `components/ai/`. |
| `edmi` | New React project base: theme + fonts + utils + all components (`init` target). |
| `<name>` | One component, e.g. `button`, `card`, `ai-message`. Dependencies are pulled in. |
| `theme-<base>-<accent>` | Color theme item, see [theming.md](theming.md). |

For everything: `theme all patterns ai-all`. For a focused app, install `theme` plus only the components used.

`--overwrite` replaces existing stock shadcn files with the Edmi versions (same names, same props). Without it the CLI asks per file.

## React (shadcn/ui, Base UI)

New project, one command (theme, fonts, utils, every component):

```bash
npx shadcn@latest init https://viandwi24.github.io/edmi-ui/r/react/edmi.json
npx shadcn@latest add @edmi-ui/patterns @edmi-ui/ai-all     # optional extras
```

Existing shadcn project: register the namespace, then add.

```bash
npx shadcn@latest registry add "@edmi-ui=https://viandwi24.github.io/edmi-ui/r/react/{name}.json"
npx shadcn@latest add @edmi-ui/theme @edmi-ui/all --overwrite
```

(`registry add` writes `registries` into `components.json`; or add it by hand: `{ "registries": { "@edmi-ui": "https://viandwi24.github.io/edmi-ui/r/react/{name}.json" } }`.) Single items: `npx shadcn@latest add @edmi-ui/button @edmi-ui/card`.

## Vue (shadcn-vue, Reka UI)

`init` from a URL is not supported. Initialise shadcn-vue first, then register the namespace in `components.json`:

```json
{ "registries": { "@edmi-ui": "https://viandwi24.github.io/edmi-ui/r/vue/{name}.json" } }
```

```bash
npx shadcn-vue@latest add @edmi-ui/theme @edmi-ui/all --overwrite
npx shadcn-vue@latest add @edmi-ui/patterns @edmi-ui/ai-all
```

Phosphor icons for a new Vue project must be chosen at init (`shadcn-vue init ... --icon-library phosphor`; check `shadcn-vue init --help` for the current flags). A registry item cannot set the project's icon library.

## Svelte (shadcn-svelte, Bits UI)

shadcn-svelte has no namespaced registries: pass URLs. Initialise shadcn-svelte first (`init`).

```bash
npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/theme.json https://viandwi24.github.io/edmi-ui/r/svelte/all.json --overwrite
npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/ai-all.json
npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/button.json    # single item
```

With bun, run it as `bunx --bun shadcn-svelte@latest ...`.

## Pinned versions (CDN)

Each release is also published to npm and served by jsDelivr. Pin a major instead of tracking latest:

```bash
npx shadcn@latest add https://cdn.jsdelivr.net/npm/@edmi-ui/registry-react@0/r/button.json
npx shadcn-vue@latest add https://cdn.jsdelivr.net/npm/@edmi-ui/registry-vue@0/r/button.json
npx shadcn-svelte@latest add https://cdn.jsdelivr.net/npm/@edmi-ui/registry-svelte@0/r/button.json
```

Design tokens alone (no components): `npm install @edmi-ui/tokens` (`pnpm add`, `yarn add`, `bun add`), then in CSS:

```css
@import "tailwindcss";
@import "@edmi-ui/tokens/tokens.css";
@import "@edmi-ui/tokens/theme.css";
```

## Where files land

| | UI | AI | Import |
| --- | --- | --- | --- |
| React | `components/ui/<name>.tsx` | `components/ai/<name>.tsx` | `@/components/ui/button`, `@/components/ai/message` |
| Vue | `components/ui/<name>/` (barrel `index.ts`) | `components/ai/<name>/` | `@/components/ui/button`, `@/components/ai/message` |
| Svelte | `$lib/components/ui/<name>/` | `$lib/components/ai/<name>/` | `$lib/components/ui/button`, `$lib/components/ai/message` |

Use the paths from the project's `components.json` aliases; the above are the defaults.

## Icons

Icons follow the project's `components.json` `iconLibrary` (lucide, tabler, hugeicons, phosphor, remixicon). Edmi's own default is Phosphor, an existing project keeps its library. React and Svelte registry sources use an icon placeholder the CLI rewrites on install; Vue sources import from `@lucide/vue` and the CLI rewrites them. In your own code, import icons from the project's configured library, not from Edmi files.

## Dark mode

Add the `dark` class to `<html>`. Tokens are CSS variables, so no provider is needed.

## Updating

Re-run `add ... --overwrite` for the items you want refreshed. Components are copied into the repo, so diff before overwriting files you edited; keep customisations in wrapper components or `className` rather than editing registry files when possible.

## Troubleshooting

- `@edmi-ui` not found: the namespace is missing from `components.json` (React/Vue). Svelte never has it: use URLs.
- Components look stock: the `theme` item was not installed, or the global CSS does not import the tokens.
- Wrong colors after installing a `theme-*` item: install it after `theme`, not before.
- Svelte duplicate icon import errors after install: an icon placeholder is imported twice in one file; keep one import.

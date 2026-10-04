---
name: edmi-ui
description: Build, install, theme and use Edmi UI (editorial minimalist, shadcn-compatible components for React, Vue and Svelte) correctly. Use when the user builds or styles UI with Edmi UI, @edmi-ui registry items, shadcn/ui, shadcn-vue or shadcn-svelte; asks for a calm editorial or minimalist look, flat or raised (3D lip) buttons and cards, themes (stone, slate, green, ocean), dark mode, dashboards, landing pages, or AI chat, agent, code, voice and workflow interfaces (ai-* components, prompt input, message, conversation, Vercel AI SDK useChat).
license: MIT
metadata:
  homepage: https://viandwi24.github.io/edmi-ui/
---

# Edmi UI

Edmi (EDitorial MInimalist) is a design system delivered as three shadcn registries: React (shadcn/ui on Base UI), Vue (shadcn-vue on Reka UI) and Svelte (shadcn-svelte on Bits UI). Item names, anatomy and props match the stock shadcn components, so `add @edmi-ui/<name> --overwrite` is a drop-in restyle. Additions are marked ✦ and are additive only. Warm neutrals, mono numbers, one-step depth. Docs and live demos: https://viandwi24.github.io/edmi-ui/

Registry base URL: `https://viandwi24.github.io/edmi-ui/r/<react|vue|svelte>/{name}.json`

## Golden rules

1. **Install, do not hand-write.** If an Edmi item exists (see [references/components.md](references/components.md)), add it with the framework CLI. Never recreate a button, card, dialog, chat message or table by hand, and never copy class strings from memory.
2. **Flat by default, `raised` is opt-in.** Pass `raised` only where [references/raised.md](references/raised.md) says so: one primary action per region, hero and marketing CTAs, key cards. Dense app UI, forms, tables and menus stay flat. `ghost`, `link` and Tabs `line` are never raised.
3. **Tokens only.** Use semantic Tailwind utilities (`bg-card`, `text-muted-foreground`, `border-border`, `bg-brand-soft`). No hex, no theme names, no `/NN` opacity on `bg-`/`border-`, no blurred shadows. Details in [references/rules.md](references/rules.md).
4. **Positive values use `success`, accents use `brand`.** `brand` changes with the theme (blue in Ocean); `success` is always green.
5. **Numbers are mono and right-aligned in tables.** Control height is `h-9` (36px), `sm` 32px, `lg` 42px; controls in a row share one height.
6. **Match the framework.** React uses `render={<a />}` (never `asChild`), Vue uses `as-child`, Svelte uses `child` snippets and a URL-only registry. See [references/frameworks.md](references/frameworks.md).
7. **Imports are consumer paths**: `@/components/ui/button` (React, Vue), `$lib/components/ui/button` (Svelte). AI items live in `components/ai/`, never in `components/ui/`.
8. **Verify, do not guess.** Read the installed source in `components/ui/<name>` for exact props and variants; the docs page for each item has a live demo and API table.

## Decision guide

| The user wants to... | Do this |
| --- | --- |
| Start a new app with Edmi | React: `init` with the `edmi.json` URL. Vue/Svelte: scaffold shadcn-vue / shadcn-svelte, then install `theme` + `all`. See [references/install.md](references/install.md) |
| Restyle an existing shadcn project | Register `@edmi-ui` (React/Vue) then `add @edmi-ui/theme @edmi-ui/all --overwrite` |
| Add one component | `add @edmi-ui/<name>`; dependencies resolve automatically |
| Change colors, radius, dark mode | [references/theming.md](references/theming.md): `theme-<base>-<accent>` items, `data-base` / `data-theme` attributes |
| Make something feel tactile or premium | `raised` on the right elements only: [references/raised.md](references/raised.md) |
| Build a dashboard, landing or marketing page | UI items + `patterns` (headers, stat tiles, tickers, pricing, footer); raised on hero CTA and key cards |
| Build a chat, agent or workflow UI | `ai-all` or single `ai-*` items: [references/ai.md](references/ai.md) |
| Upgrade to a newer Edmi version | [references/upgrading.md](references/upgrading.md): changelog, preview, `--overwrite`, review `git diff` |
| Find the right component | [references/components.md](references/components.md) (every item with a use-when line) |

## Workflow for any UI task

1. Detect the framework (`components.json`, `package.json`: `react`, `vue`, `svelte`) and the package manager (lockfile). Use the user's manager for CLI commands (`npx`, `pnpm dlx`, `yarn dlx`, `bunx`; `bunx --bun` for shadcn-svelte).
2. Check whether Edmi is installed: `@edmi-ui` in `components.json` registries (React/Vue) or Edmi tokens (`--brand`, `--lip`) in the global CSS. If not, install per [references/install.md](references/install.md) before writing UI.
3. Pick components from the catalog; install what is missing in one `add` command.
4. Compose with Tailwind layout utilities and tokens. Keep one level of depth: face plus one hard lip, only through `raised`.
5. Check light and dark (`.dark` on `<html>`) and, if the app switches themes, a second base/accent.
6. Run the project's typecheck and build. Icons: use the project's `iconLibrary`; Edmi sources are rewritten on install.

## Reference files (load on demand)

- [references/install.md](references/install.md): install flows per framework, entry items, pinned CDN, icons, updating.
- [references/upgrading.md](references/upgrading.md): moving to a newer release safely.
- [references/theming.md](references/theming.md): tokens, base x accent, radius, dark mode, runtime switching, custom accent.
- [references/raised.md](references/raised.md): when to use `raised` and when not, with do/don't examples.
- [references/components.md](references/components.md): catalog of every item with a use-when line and key ✦ additions.
- [references/ai.md](references/ai.md): the `ai-*` pack and how to compose a chat.
- [references/rules.md](references/rules.md): design rules for custom UI written around Edmi.
- [references/frameworks.md](references/frameworks.md): React, Vue and Svelte differences.

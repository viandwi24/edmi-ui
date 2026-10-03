# Edmi UI - Vue example (Stockbreak Markets)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/vue)

- Run: `bun install && bun run dev` (from the repo root or this folder).
- Scaffold: `bun create vite vue --template vue-ts`, then `shadcn-vue init --base reka --style nova --icon-library phosphor`.
- Edmi was installed with the CLI only, via `examples/install.sh vue` (`registries.@edmi-ui` in components.json, `shadcn-vue add @edmi-ui/theme @edmi-ui/all ... --overwrite`).
- Shell: Dashboard (Sidebar `collapsible="icon"`) and Navbar layouts, picked from a first-visit toast and kept in a cookie; theme toggle sets `.dark` and a cookie.
- Page: `src/pages/MarketsPage.vue` with mock data in `src/data/markets.ts`; it does not depend on the shell.

# Edmi UI - Svelte example (Stockbreak Markets)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/svelte)

- Run: `npm install && npm run dev` (or `pnpm install && pnpm dev`, `yarn && yarn dev`, `bun install && bun run dev`). The folder is standalone: it does not need the monorepo.
- Scaffold: `sv create svelte --template minimal --types ts`, `sv add tailwindcss`, then `shadcn-svelte init --preset b2fA` (nova; `iconLibrary` set to phosphor).
- Edmi was installed with the CLI only, via `examples/install.sh svelte` (`shadcn-svelte add <url>/theme.json <url>/all.json ... --overwrite`).
- Shell: Dashboard (Sidebar `collapsible="icon"`) and Navbar layouts, picked from a first-visit toast and kept in a cookie; the theme toggle sets `.dark` and a cookie, both read in SSR (`hooks.server.ts`, root load) so there is no flash.
- Page: `src/lib/pages/markets.svelte` with mock data in `src/lib/data/markets.ts`; it does not depend on the shell.

# Edmi UI - Svelte example (Layerbeat: Create a BeatVPS)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/layerbeat-svelte)

- Run: `npm install && npm run dev` (or pnpm, yarn, bun). The folder is standalone: it does not need the monorepo.
- Same scaffold as `examples/svelte`; Edmi installed with the CLI only (`examples/install.sh svelte`), then `theme-slate-ocean.json` after `theme.json`.
- Theme Slate · Ocean; light/dark switch stored in a cookie and read in SSR (`hooks.server.ts`), so no flash.
- The sidebar is always dark navy through a scoped `class="dark"` on the sidebar subtree.
- Page: `src/lib/pages/create-beatvps.svelte`, mock data in `src/lib/data/layerbeat.ts`. Flat by default, `raised` on the summary card, CTA and billing term control.

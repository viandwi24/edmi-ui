# Edmi UI - Vue example (Layerbeat, "Create a BeatVPS")

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/layerbeat-vue)

- Run: `npm install && npm run dev` (standalone, no monorepo needed).
- Theme Slate · Ocean: `shadcn-vue add @edmi-ui/theme-slate-ocean --overwrite`, installed after `@edmi-ui/theme`. Flat by default; raised on the summary card, CTA and segmented controls.
- Always-dark navy sidebar through a scoped `class="dark"` on the sidebar subtree; the mode switch (`.dark` + cookie) drives the rest.
- Edmi was installed with the CLI only (`examples/install.sh vue`). Page: `src/pages/CreateBeatVps.vue`, mock data in `src/data/layerbeat.ts`.

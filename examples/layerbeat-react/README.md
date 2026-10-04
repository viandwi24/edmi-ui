# Edmi UI - React example (Layerbeat, Create a BeatVPS)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/viandwi24/edmi-ui/tree/main/examples/layerbeat-react)

- Run: `npm install && npm run dev` (or `pnpm install && pnpm dev`, `yarn && yarn dev`, `bun install && bun run dev`). Standalone, no monorepo needed.
- Edmi was installed with the CLI only (`examples/install.sh react`), then the theme `shadcn add @edmi-ui/theme-slate-ocean --overwrite` (Slate base, Ocean accent) after `@edmi-ui/theme`.
- Page: `src/pages/create-beatvps.tsx` (5 step cards + sticky summary at `elevation="raised"`), mock data in `src/data/layerbeat.ts`.
- Shell: always-dark navy sidebar via a scoped `class="dark"`, workspace switcher and a light/dark mode switch (cookie).

# Docs examples

Real pages built only from registry items, live in React, Vue and Svelte, shown at `/examples` (spec:
`refs/edmi-ui/EXAMPLES.md`). Conventions are binding for every example; the long form is AGENTS.md section
"Docs examples".

## Layout

```
src/examples/
  index.ts                  list of examples (slug, title, tag, board, thumb, uses): drives index, routes, sidebar, verify
  <slug>/
    data.ts                 ONE shared sample-data file, imported by all three ports as "./data"
    react.tsx               default export = the page   (aliases: @edmi-react/…)
    vue.vue                 <script setup lang="ts">    (aliases: @edmi-vue/…)
    svelte.svelte           Svelte 5 runes              (aliases: @edmi-svelte/…)
    react/ vue/ svelte/     OPTIONAL helper components of that port (listed after the main file in the Code tab)
public/examples/<thumb>-{light,dark}.png     thumbnails, 800px wide, GENERATED from the live render (see "Thumbnails")
```

Routes (static, generated from `index.ts`): `/examples/` (grid + tag filter), `/examples/<slug>/` (one screen: full-bleed
iframe, floating header with the toolbar, Code drawer, Info popover), `/examples/<slug>/render/<fw>/` (bare page rendered in the iframe; knobs by query
`?mode=&base=&theme=&radius=` and `postMessage`).

## Rules

- Import registry items only: `@edmi-react/ui|components/ai|blocks/…`, `@edmi-vue/ui|components/ai/…`,
  `@edmi-svelte/ui|ai/…` (rewritten to `@/components/...` / `$lib/components/...` in the Code tab). No
  `packages/*` paths, no `../`, no CSS files, no `<style>` blocks; Tailwind utility classes on layout wrappers
  are fine. A missing piece is a registry gap: report it, do not hack it in.
- Icons follow the registry rules: React `IconPlaceholder` (all five props), Svelte `IconPlaceholder` (import
  once), Vue `@lucide/vue` names that map to phosphor.
- The page fills the iframe: root element `min-h-svh` (or `h-svh` for app shells) with `bg-background
  text-foreground`. Do not set `dark`, `data-base`, `data-theme` or `--radius` yourself, the render route does.
- Same markup and class strings in all three ports (differences only for framework idioms). Opt into `raised`
  where the screenshot shows 3D controls (Stockbreak pages), stay flat for the AI boards.
- Sample data lives in `data.ts` only (plain TS, no framework imports, local structural types). No network.

## Add an example

1. Pick the row in EXAMPLES.md, open its screenshot and `reference/*.dc.html`.
2. Create `src/examples/<slug>/` with `data.ts`, `react.tsx`, `vue.vue`, `svelte.svelte`. Port from React;
   existing `examples/{react,vue,svelte}` apps and `src/demos/*` show each port's idioms.
3. Generate the thumbnails from the live render (`bun scripts/example-thumbs.ts`, see "Thumbnails"); never copy
   a board screenshot: thumbnails must match what the example renders.
4. Add the entry to `index.ts` (all three frameworks). Restart `astro dev` (islands are generated at config load).
5. Verify: `bun run verify:matrix` (runs `scripts/verify-examples.ts`), `bun run typecheck`, `bun run lint`,
   docs build, then compare `/examples/<slug>/render/<fw>/?mode=…&base=…&theme=…` against the board in light
   and dark, stone·green and slate·ocean, all three frameworks.

## Layout variants (Stockbreak)

Stockbreak has two app layouts. The ten page examples (`markets`, `explore`, ...) render the **navbar** layout
(`AppHeader`); `markets-sidebar` is the same Markets page in the **sidebar** app shell (inset `Sidebar` with
search, nav, watchlist and the faucet card, breadcrumb header). A layout variant is a separate example folder
(own `data.ts` copy, since examples may not import from each other) with the layout in the title
("Markets · navbar layout" / "Markets · sidebar layout"). Add more `<page>-sidebar` examples the same way
(copy the folder, swap the header for the shell).

## Thumbnails

Thumbnails are generated from the live React render so the index always matches the examples (no board crops):

```bash
bun run --filter @edmi-ui/docs dev -- --port 4770                      # or astro preview on a built site
bun scripts/example-thumbs.ts --url http://localhost:4770/edmi-ui [slug...]
# open the printed .../__thumbs.html in a browser (the in-app browser works) and leave it open until the script exits
```

The script needs no extra dependency and no headless browser: it writes a temporary driver page
(`public/__thumbs.html`, deleted on exit) that loads `/examples/<slug>/render/react/?mode=&base=&theme=` in a
1440x1080 same-origin iframe, rasterises it (SVG foreignObject, page CSS and Google Fonts inlined), and a tiny
receiver stores `public/examples/<thumb>-{light,dark}.png`, resized with `sips -Z 800`. It honours
`defaultBase`/`defaultTheme` and a forced `defaultMode` (both thumbnails then use that mode). Regenerate after
any visual change to an example, and compare the index card with `/examples/<slug>/` (focus rings and canvas
elements are not captured).

## Viewer (`components/ExampleViewer.astro`)

One screen (100dvh, no page scroll): the preview iframe fills the viewport and the docs header becomes a floating
rounded bar (solid `--popover`, 1px border; only on this page). The viewer script moves its toolbar into the header
slot (`data-header-slot` in `overrides/Header.astro`): example name + tag, then mode/base/theme/radius knobs,
viewport presets, zoom and the width readout, framework, Code, Info, Open, hide-bar. Below 100rem the knobs, presets
and zoom collapse into a "Controls" dropdown; below 62rem the header wraps the toolbar into a second row; below 40rem
buttons are icon-only and the framework select moves into Controls.
- **Zoom** (50, 67, 75, 90, 100, 110, 125, 150 %): `--z` on the frame scales the iframe with a CSS transform
  while the iframe keeps its logical width (`visual / zoom`), so a preset (390, 820) keeps its breakpoints and
  only the visual size changes; responsive mode behaves like browser zoom. Ctrl/Cmd + `=`, `-`, `0` zoom the preview.
- **Code**: a drawer over the right side of the preview (framework file tabs). **Info**: popover with description,
  board, tag and the registry items used (moved out of the page body).
- **Hide bar** (replaces "full page"): hides the floating header; Esc (or the small restore button top right)
  brings it back. Esc first closes an open Controls/Info/Code panel. Nothing is persisted.
- The drag handle appears only while the frame is narrower than the stage (after choosing Tablet/Mobile).

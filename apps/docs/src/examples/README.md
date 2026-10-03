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
public/examples/<thumb>-{light,dark}.png     thumbnails, ~800px wide (copy from refs/edmi-ui/screens with `sips -Z 800`)
```

Routes (static, generated from `index.ts`): `/examples/` (grid + tag filter), `/examples/<slug>/` (toolbar,
resizable iframe, Code tab), `/examples/<slug>/render/<fw>/` (bare page rendered in the iframe; knobs by query
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
3. Copy light and dark screenshots to `public/examples/<thumb>-{light,dark}.png`.
4. Add the entry to `index.ts` (all three frameworks). Restart `astro dev` (islands are generated at config load).
5. Verify: `bun run verify:matrix` (runs `scripts/verify-examples.ts`), `bun run typecheck`, `bun run lint`,
   docs build, then compare `/examples/<slug>/render/<fw>/?mode=…&base=…&theme=…` against the board in light
   and dark, stone·green and slate·ocean, all three frameworks.

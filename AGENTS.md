# AGENTS.md — Edmi UI

Single source of repo knowledge for humans and AI agents (Claude Code, Codex, Cursor, …). `CLAUDE.md` only
imports this file. Read sections 1–5 and 12 before touching anything; read the playbook (7) for your task type.

## 1. What Edmi UI is

Edmi (EDitorial MInimalist) is a Bun monorepo that builds **three shadcn-compatible component registries** from one manifest:

| | React | Vue | Svelte |
|---|---|---|---|
| Stock library | shadcn/ui | shadcn-vue | shadcn-svelte |
| Primitives | Base UI | Reka UI | Bits UI |
| Variants | `cva` | `cva` | `tailwind-variants` (`tv()`) |
| Package | `packages/react` | `packages/vue` | `packages/svelte` |

- Same item names and anatomy/props as shadcn, so `add @edmi-ui/<name> --overwrite` is a drop-in restyle. ✦ marks Edmi additions (additive only; never remove a stock prop or variant).
- **Flat by default.** Every component renders the plain shadcn look. Depth is the opt-in `elevation` ✦ prop (`sunken | flat | raised | floating`, bevel not lips) or an `ElevationProvider mode="layered"` scope (section 5).
- Default icons: **Phosphor**, switchable through the consumer's `iconLibrary` (see 6).
- **Edmi AI pack**: 56 more items named `ai-<name>` (restyled Vercel AI Elements + ✦ additions) in all three ports, installed with `add @edmi-ui/ai-all` into `components/ai/`. Procedure and conventions: section 7b.
- **Bun is the only package manager and runtime for developing this repo.** No npm/pnpm/yarn, no Node install. This is a maintainer rule only: people *using* Edmi UI may use any package manager, so every user-facing doc, README and example shows npm (default), pnpm, yarn and bun. Run CLIs with `bunx` (bun provides a `node` shim); `bunx npm …` only for publish/pack. Do not use the `gh` CLI.
- Docs and live demos: <https://viandwi24.github.io/edmi-ui/> (GitHub owner `viandwi24`, base `/edmi-ui`). Long-term domain `https://ui.edmi.dev` (the `EDMI_URL` default of the generator).

## 2. Commands

```bash
bun install                 # only when a task requires dependency changes
bun run gen                 # generate packages/<fw>/registry.json from registry.manifest/ (warns on missing files)
bun run gen:strict          # same, but missing files / unresolved deps are errors (CI uses this)
bun run build:registry      # run each package's registry build -> apps/docs/public/r/<fw>/*.json
bun run pack:registries     # build npm-publishable registries into packages/registry-<fw>/r (EDMI_URL = jsDelivr path)
bun run release             # CI publish step (release.yml publish-script): gen:strict, build:registry, pack:registries, changeset publish
bun run verify:matrix       # item x framework matrix (manifest + built JSON + docs page + demo + <name>-elevation demos); exit 1 on gaps; --markdown prints the README table; `scripts/ai-pending.json` must stay empty
bun run scripts/ai-fetch-stock.ts [dir]   # AI pack: download the stock AI Elements sources (react/vue/svelte) into .ai-src/ (gitignored) for porting
bun run scripts/ai-icon.ts ArrowUpIcon size-4   # AI pack: print the 5-prop <IconPlaceholder /> snippet for a lucide icon name
bun run scripts/gen-skill.ts   # consumer agent skill: rewrite the generated blocks in skills/edmi-ui/references (--check to verify); bun test covers it
bun run typecheck           # root tsc + every workspace's typecheck (astro check, vue-tsc wrapper, svelte-check)
bun run lint                # biome check .   (bun run format = biome check --write .)
bun test                    # generator + tokens tests
bun run dev                 # docs site (Astro, http://localhost:4321/edmi-ui)
bunx changeset              # add a changeset (see 9)
```

Per-package preview pages (light and dark side by side, one page per board group, auto-discovered `src/preview/<group>.*`):
`bun run --filter @edmi-ui/react dev -- --port <p>`, `bun run --filter @edmi-ui/vue dev -- --port <p>`, `bun run --filter @edmi-ui/svelte dev -- --port <p>` (Svelte route `/preview?group=*`).
Docs: `bun run --filter @edmi-ui/docs build|preview`.

Smoke tests (install the built registry into a **fresh** project the way a user would, then typecheck/build; they build the registry into a temp dir with a local `EDMI_URL`, so `apps/docs/public` is untouched):
`bash scripts/smoke/all.sh` (all) or `react.sh | vue.sh | svelte.sh | theme.sh | example-react.sh | example-vue.sh | example-svelte.sh`. `theme.sh [react] [vue] [svelte]` installs `theme-slate-ocean` through each CLI (namespace `@edmi-ui`, Svelte by URL), checks light + dark cssVars (success stays green) and, for React, pastes the docs "Copy CSS" output and runs `tsc` + `vite build`. `scripts/smoke/vue-icons.ts` (run by `vue.sh`) validates Vue icon names (see 6).

## 3. Repo map

```
packages/tokens           @edmi-ui/tokens (published): tokens.css, theme.css, tokens.json, fonts.css, recipes.ts, css-vars.ts. recipes.ts/kit.css are verbatim copies from refs/edmi-ui
packages/react|vue|svelte private registry SOURCES (never published): registry/{ui,lib,hooks,blocks}/… (svelte: src/lib/registry/…) + preview app + components.json
packages/registry-<fw>    publish wrappers holding built r/*.json (generated, gitignored); versioned CDN registries
registry.manifest/        single source of truth for items:
                            <group>.ts            shared item data + react files   (actions, forms-text, forms-choice, display, overlays,
                            <group>.vue.ts        Vue overlay  `entries: Record<item, FrameworkEntry>`   navigation, layout, data, conversation,
                            <group>.svelte.ts     Svelte overlay                                          patterns, patterns-2, meta)
                            index.ts merges all; types.ts; meta.ts = theme / all / edmi / fonts
                          ai-chat|ai-agent|ai-code|ai-runtime|ai-voice|ai-workflow|ai-patterns|ai-utilities (.ts + .vue.ts + .svelte.ts) = Edmi AI pack; ai-shared.ts = aiItem/aiReact/aiVue/aiSvelte helpers
skills/edmi-ui            consumer agent skill (SKILL.md + references/*.md), installed with `npx skills add viandwi24/edmi-ui`; see 7.7
scripts/                  gen-skill.ts + skill.test.ts (skill catalog), gen-registry.ts (+ lib/registry.ts, tested), build-registry.ts, pack-registries.ts, verify-matrix.ts, ai-pending.json (AI items not ported yet), ai-fetch-stock.ts, ai-icon.ts, smoke/*
NOTICE, licenses/         third-party attribution (AI Elements Apache-2.0, AI Elements Vue Apache-2.0, Svelte AI Elements MIT)
apps/docs                 Astro + Starlight site: src/demos/<fw>/<name>[-elevation].*, src/content/docs/components/<group>/<name>.mdx (AI: components/ai-<cat>/ai-<name>.mdx), plugins/, templates/component.mdx + ai-component.mdx
examples/react|vue|svelte Stockbreak Markets app per framework + examples/install.sh
.changeset/               changesets (fixed version group)
refs/edmi-ui              BINDING design spec v2.1 = v2 + REVISIONS.md (DESIGN.md, tokens incl. base/slate.css + themes/ocean.css, recipes, kit.css, reference boards, screens/ incl. layerbeat-example)
refs/stockbreak-design    spec v1, history only; do not follow
```

Generated, gitignored, never hand-edited: every `registry.json`, `apps/docs/public/r/**`, `apps/docs/src/components/islands/**`, `packages/registry-*/r`.

## 4. How the registry works

1. Items are declared once in `registry.manifest/<group>.ts` (`name`, `title`, `description`, `type`, `categories`, `registryDependencies` as **Edmi names only**, `docs`, `frameworks.react`). Vue/Svelte file lists live in the `<group>.vue.ts` / `<group>.svelte.ts` overlays (separate files so ports never edit the same file). Per-framework `skip: true` omits an item (the only one today: `use-mobile` for Vue); depending on a skipped item is an error.
2. `bun run gen` (`scripts/gen-registry.ts`, logic in `scripts/lib/registry.ts`) writes `packages/<fw>/registry.json`: deterministic, sorted, with `homepage = EDMI_URL`. It rewrites `registryDependencies`: React/Vue → `@edmi-ui/<name>`, Svelte → `${EDMI_URL}/r/svelte/<name>.json` (shadcn-svelte has no namespaces). `--strict`/`CI=true` fails on missing files; `--out <dir>` writes all three elsewhere (smoke tests).
3. The port's own CLI builds JSON: `shadcn build` (React), `shadcn-vue build`, `bunx --bun shadcn-svelte registry build`, into `apps/docs/public/r/<fw>/`. Pages serves them at `https://viandwi24.github.io/edmi-ui/r/<fw>/{name}.json` (CORS open).
4. Entry items (`registry.manifest/meta.ts`): `theme` (registry:theme, cssVars from `@edmi-ui/tokens`, `[data-elevation=raised], [data-elevation=floating]` base rule, border/body base layer), `all` (aggregate of every `registry:ui` item for that framework), `patterns` (aggregate of every item in the Patterns category, `aggregate: "patterns"`; add it with `all` for everything), `edmi` (React `registry:base` with `extends: "none"`, `config.style: "base-nova"`, `config.iconLibrary: phosphor`, `config.registries["@edmi-ui"]` injected from `EDMI_URL`; Vue → `registry:block`; Svelte → `registry:style`), `font-instrument-sans|jetbrains-mono|sora` (React `registry:font`, `@fontsource-variable/*`; Vue/Svelte get the Google Fonts `@import` inside theme `css`).
5. Theme items (`registry.manifest/themes.ts`, generated): one `registry:theme` item per **base × accent** (`theme-stone-green` = default colors, `theme-stone-ocean`, `theme-slate-green`, `theme-slate-ocean`) for all three ports. Bases/accents are auto-discovered from `packages/tokens/src/base/*.css` (+ implicit `stone`) and `src/themes/*.css` (+ implicit `green`) by `listBases()/listThemes()` in `css-vars.ts`; `composeCssVars(base, theme)` merges `tokens.css` → base → theme (theme wins for `primary`) from the `[data-base=…]`, `.dark[data-base=…]`, `[data-theme=…]`, `.dark[data-theme=…]` blocks. Each item carries the complete light + dark color set and **replaces** `:root`/`.dark` on install (shadcn-style); `radius` is deliberately omitted so a theme never resets the app's radius; no `registryDependencies` (run after `@edmi-ui/theme`); never part of `all`/`edmi`. `verify:matrix` checks every discovered combination x framework; `scripts/gen-registry.test.ts` and `css-vars.test.ts` cover the merge.
6. Install flows: React `init <url>/edmi.json` (new) or `registry add "@edmi-ui=<url>/r/react/{name}.json"` + `add @edmi-ui/theme @edmi-ui/all --overwrite`; Vue `registries.@edmi-ui` in `components.json` + `add @edmi-ui/theme @edmi-ui/all --overwrite` (init-from-URL is unsupported, see 11); Svelte URL-only `add <url>/theme.json <url>/all.json --overwrite`.
7. `registryDependencies` rules: Edmi names only, never stock shadcn items; every dependency must exist in the manifest; a dependency may not be skipped for that framework.
8. Distribution: Pages = docs + latest registries (`EDMI_URL` = Pages URL). npm = `@edmi-ui/tokens` and `@edmi-ui/registry-{react,vue,svelte}`; `pack:registries` regenerates with `EDMI_URL=https://cdn.jsdelivr.net/npm/@edmi-ui/registry-svelte@<major>` so Svelte URL deps pin the same major. Consumers: `https://cdn.jsdelivr.net/npm/@edmi-ui/registry-<fw>@0/r/<name>.json`. `@edmi-ui/{react,vue,svelte}` source packages are `"private": true`.
9. Schema notes: Svelte registry items are strict (no `docs`/`categories`/`config`; generator moves them into `meta`). `config` is honoured only on React `registry:base`. Every emitted item has `files` + `registryDependencies` (possibly empty).

## 5. Design rules and elevation

**Design changes need a handoff document (maintainer rule).** Agents (and the maintainer, from this repo) never design or restyle components here: no new looks, elevation schemes, tokens, variants or visual tweaks on their own initiative. Design is done in the design app; the maintainer exports a handoff document into `refs/*`, and only then do agents implement that revision, so the code always stays in sync with the design app. Allowed without a handoff: bug fixes that restore the documented spec (wrong state, broken layout, port mismatch, docs-site CSS leaks), docs-site/tooling work, and behaviour fixes. If a request would change the look and there is no handoff, stop and ask for one.

Binding spec (v4, `refs/edmi-ui` incl. `REVISIONS.md` v1 → v3 and `REVISIONS-v4.md` #1-#21; the handoff `refs/edmi-ui-update-4/design/` is mirrored into `refs/edmi-ui`): `refs/edmi-ui/DESIGN.md` (§1 stack, §3 theming, §4 rules, §5 components). **Read §4 before touching any component.** Classes come from `packages/tokens/src/recipes.ts` (inline the strings into each component; registry files cannot import `@edmi-ui/tokens`). Compare with the boards in `refs/edmi-ui/screens/edmi-ui-kit/<NN-board>-{light,dark}.png` (each board has a "Raised ✦" row) and `refs/edmi-ui/reference/*.dc.html` for exact values. Do not "improve" §4.

Theming (spec §3, v2.1): four knobs on `<html>`: mode `class="dark"`, `data-base` (stone default, slate), `data-theme` (green default, ocean), `--radius`. Load order tokens → base → themes. `@edmi-ui/tokens` ships `base/slate.css` and `themes/ocean.css` (exports `./base/slate.css`, `./themes/ocean.css`); distribution/customizer wiring is a separate task. Components use tokens only, never a theme name.

Rules in short (§4, v4):
1. Flat by default; depth is the **elevation** system (§4b, "Elevation (v4)" below). Four levels: -1 sunken, 0 flat, +1 raised, +2 floating. `ghost`/`link` buttons and Tabs `line` never carry a bevel.
2. **Bevel, not lips.** Raised = inner rim `inset 0 0 .26px 1.1px var(--bv-ring)` + top highlight `inset 0 1px 0 var(--bv-top)` + dark hairline `0 0 1.5px var(--bv-out)` (`shadow-raised`). Floating = bevel + ONE soft drop (`shadow-floating`; buttons `shadow-btn-float-*`). No hard 2px/4px lips anywhere. Gradient faces use `[background-origin:border-box]` and a transparent border.
3. **Sunken = soft inset.** `bg-sk-bg border-sk-bd shadow-sunken` (blur allowed on the inset only). Never a hard dark top edge; focus swaps the edge for the ring. No drop-shadow blur on raised surfaces beyond the single floating drop.
4. Dark primary = white face (slightly darker than white so the top edge reads) with a transparent side border; filled buttons keep their colour when sunken (8% darker).
5. Pressed: `translateY(1px)` + `shadow-pressed` (floating: `shadow-pressed-float`); flat = slightly darker fill.
6. **Only the active part rises** on tabs, segmented/toggle group, pagination, calendar (elevation sits on the shell), switch thumb, slider thumbs, checkbox (checked box).
7. Floating chips over another surface are solid (`--popover`) with a 1px border; no transparency or outer ring.
8. Inset panel: header on the `--muted` shell (level 0); body is a `--card` plate inset 2px from the shell (left/right/bottom) with its own full radius; with a footer the body keeps a 0 bottom gap and the footer sits on the shell without a divider.
9. Message rows: avatar top-aligned with the sender line. 10. One height per group. 11. Numbers are mono, right-aligned in tables; up = `--brand-text`, down = `--destructive-text`. 12. Marketing headings soft ink, weight 400–500. 13. Brand badges/alerts/toasts = soft fill + tinted 30–40% border.
15. Positive values use `success`. 16. **No transparent fills**: every `*-soft` token is a solid colour (pre-mixed onto `--popover`, per base); tinted borders are `border-[color-mix(in_srgb,var(--x)_30%,var(--popover))]` (in-flow tints over a card: `…,var(--card))`), solid-fill hovers `hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))]`. Never Tailwind `/NN` opacity on `bg-`/`border-`/`from-`/`to-` and never `color-mix(…, transparent)` on a surface; only `ring-soft`, `overlay` and decorative glows/gridlines may be transparent. 17. **Light surfaces:** `--card` is `#fff` (and `--outline-hi/-face`), so cards/inputs/panels lift off the warm body. **Code block body = `--card`, header = `--muted`**, never `--background`/`--muted` for the body.
14. **Dark mode uses ladder B** (stone dark; slate keeps its own): clearer steps between background, card, popover, border, input and muted text. Depth in dark comes from the bevel hairline and a faint top highlight, never from black blocks. The legacy `lip*`, `*-lip`, `*-edge`, `*-shade`, `card-hi`, `outline-*` tokens stay only for the example pages; components must not use them.
15. **Positive = `success`.** Up deltas, done ticks/states, success toasts, `badge`/`alert` variant `success` use `success-soft` / `success-text` (always green). `brand` is the theme accent and turns blue under `data-theme="ocean"`: use it only for accent roles (brand button/badge, live state, switch, slider, progress, ring).

Tokens/type: OKLCH tokens in `:root` (light) and `.dark`; theme and layout stored in a cookie (plain `document.cookie`, SSR-readable). Radius from `--radius: 0.625rem`. **Control height `h-9` (36px)**, `sm` 32px, `lg` 42px (Button, Input, Input Group, Select, Toggle; Textarea min-h-24). Inputs inside a ButtonGroup: `rounded-r-none shadow-none`. Fonts: Instrument Sans (UI), JetBrains Mono (every number), Sora 600 (wordmarks only).

### Elevation (v4)

Replaces the old boolean `raised` (removed everywhere, no alias; user decision 2026-10-04, handoff v4). Spec: `refs/edmi-ui/DESIGN.md` §4b, `recipes.ts` (verbatim copy in `packages/tokens/src/recipes.ts`), board 13.

**Prop** (all ports, default `auto`): `elevation?: "auto" | "sunken" | "flat" | "raised" | "floating"`. **Resolution:** explicit prop, then the nearest `ElevationProvider` scope, then `flat`. **Mode:** `<ElevationProvider mode="layered">` gives each ROLE its default level (`ROLE_LEVEL`); `<ElevationProvider level="raised">` forces one level for the subtree. Both render `data-elevation` (kit.css and the `theme` base rule key off it).

**Registry item `elevation`** (`registry:ui`, category Layout; `packages/react/registry/ui/elevation.tsx`, `packages/vue/registry/ui/elevation/`, `packages/svelte/src/lib/registry/ui/elevation/`). Every component that takes `elevation` lists `"elevation"` in `registryDependencies` and imports it like any ui item (`@/registry/edmi/ui/elevation`, Svelte `$lib/registry/ui/elevation/index.js`). Exports (same names in all ports):
- types `Elevation`, `ElevationLevel = Exclude<Elevation, "auto">`, `ElevationMode = "flat" | "layered"`, `ElevationRole`; `ROLE_LEVEL`, `resolveElevation(prop, scope, role)` (copied from the recipes);
- `ElevationProvider` (`mode?`, `level?`; layout-neutral `display: contents` unless a class is passed; React `render` prop (Base UI `useRender`), Vue `as`/`as-child` (Reka `Primitive`), Svelte `child` snippet);
- `useElevation(prop, role)`: React returns the `ElevationLevel`; Vue `useElevation(() => props.elevation, role)` returns a `ComputedRef`; Svelte `useElevation(() => elevation, role)` returns `{ current }` (getter, reactive). Call it during component init.
- Surface context: surfaces (card, panel body, popover, dialog) publish their resolved level: React `<SurfaceProvider level={level}>` around the children, Vue `provideSurface(() => level.value)`, Svelte `setSurface(() => level)`. `useElevation(prop, "surface")` with an `auto` prop returns `flat` when the nearest surface ancestor is raised/floating (no bevel on bevel); an explicit prop wins; fields, controls, buttons and overlays ignore nesting. Vue/Svelte also export `provideElevationScope` / `injectElevationScope` and `setElevationScope` / `getElevationScope` (used by the provider; rarely needed).

**Using it in a component**
1. Role from the table below. React: `const level = useElevation(elevation, "field")`; Vue: `const level = useElevation(() => props.elevation, "field")` (use `level.value`); Svelte: `const level = useElevation(() => elevation, "field")` (use `level.current`).
2. Pass `level` to the cva/tv `elevation` variant (variants `elevation: { sunken, flat, raised, floating }` and `compoundVariants` copied verbatim from `recipes.ts`, defaultVariants `elevation: "flat"`) or to `surfaceElevation[level]` for plain surfaces. Never hard-code lips or drops.
3. Prop default: React `elevation` undefined/`"auto"`; Vue `withDefaults(defineProps…, { elevation: undefined })` (treated as auto; a `"flat"` default would block the scope); Svelte `elevation = "auto"` in `$props()`. Never forward `elevation` to a Reka/Bits primitive (`reactiveOmit`) or it lands in the DOM.
4. Containers pass depth down: a container whose children rise with it (Tabs list to triggers, ToggleGroup to items, ButtonGroup to buttons, Pagination to the active link, Questionnaire to options, DatePicker to trigger + calendar shell, patterns to their Card/Button) uses its own context (React `createContext` in the same file, Vue `provide`/`inject`, Svelte `setContext`/`getContext`, always getter objects so it stays reactive); the child resolves `child.elevation` then the container value then `useElevation`.
5. Patterns and AI items never hard-code depth: they accept `elevation` and forward it to the Card/Button/surface they render.
6. Selector swap: recipes use Radix/Reka/Bits `data-[state=...]`; Vue and Svelte keep them. React (Base UI) swaps `data-[state=active]`->`data-[active]`, `on`->`data-[pressed]`, `checked`->`data-[checked]`, open popup->`data-[open]`, open trigger->`data-[popup-open]` (bracket attributes, not shadcn's custom variants).

**Per component** (role -> layered level; "rises" = the part that takes the shadow). Levels: S sunken, F flat, R raised, X floating.
| Component | Role | Levels | What rises |
|---|---|---|---|
| Button default/secondary/destructive/brand | button-filled (R) | S F R X | the button; filled buttons keep their colour when sunken |
| Button outline/ghost, Toggle (outline) | button-quiet (F) | S F R X | `link` never; ghost follows the neutral faces |
| Toggle (default) | control | F R X | only when ON |
| ButtonGroup | button-filled | F R X | R = each item; X = the whole group as one plate (`buttonGroupFloating`), items stay R |
| Badge | control (F) | S F R X | edge only; fill and tint stay |
| Kbd | handle (R) | F R X | the key (on Kbd, not KbdGroup) |
| Input, Textarea, Input Group, InputOTP, Select trigger, Native Select | field (S) | S F R X | the field; sunken swaps the edge for the ring on focus |
| Checkbox | control (F) | F R | the checked box only |
| Radio | control (F) | F | -- |
| Switch | handle (R) | F R | thumb |
| Slider | handle (R) | F R | thumbs |
| Tabs / TabsList | control (F) | F R | active trigger only (`line` never) |
| ToggleGroup | control (F) | F R | ON item only (`segmented`: `raisedActive` on the item); the group passes its level to the items |
| Pagination | control (F) | F R | active link |
| Calendar, RangeCalendar, DatePicker | handle (R) / overlay | F R X | selected day (R); elevation sits on the shell (popover/card), never the day grid |
| Card | surface (R) | S F R X | the card; a nested card drops to F |
| InsetPanel | surface body (R), shell container (F) | S F R X | R = body plate bevels; X = shell also gets the drop; the panel hands its level to `InsetPanelBody` through its own context (`inset-panel/context.ts` in Vue/Svelte) |
| EmptyMedia | handle (R) | F R X | the media tile |
| Choice card (FieldLabel card, radio/checkbox card, Questionnaire options, layout-picker) | control/surface | F R | the checked card; `elevation` on Questionnaire applies to every option |
| Popover, Dialog, AlertDialog, DropdownMenu content, ContextMenu content, Select menu (`SelectContent`) | overlay (X) | F R X | the popup; explicit prop wins; Menubar menus follow `DropdownMenuContent` |
| Toast (Sonner) | container (F), natural X | F R X | `<Toaster elevation>` adds classes to `toastOptions.classNames.toast` |
| Alert, Tooltip | container (F) | F | flat only (soft fill + tinted border) |
| Menubar | control (F) | F R | the bar |
| BubbleReactions | control | F R | chips (`active` kept) |
| PromptInput / chat composer (AI) | overlay (X) | S F R X | the composer plate |
| Patterns (✦) | per inner part | forward | forward `elevation` to the Card/Button they render |

**Patterns (v4).** Pattern items (headers, tiles, strips, panels, cards, `layout-picker`, `kanban-column`, `watchlist-item`, `data-table`) take `elevation` and forward it to the Card/Button/Input they render; none hard-codes depth. A pattern whose own plate is a surface (`app-header`, `site-header`, `layout-picker` toast) resolves it with `useElevation(elevation, "surface" | "overlay")`; its inner controls follow an explicit level (`raised`/`floating` raise them, `flat`/`sunken` keep them flat, `auto` leaves them to their roles). Wells (kanban column, layout wireframe) use `border-sk-bd bg-sk-bg shadow-sunken`. `DataTable` keeps the table container flat and forwards `elevation` to toolbar and pagination controls. Svelte `SiteHeader`'s `action` snippet receives `{ elevation }`. The Stockbreak docs examples (markets, markets-sidebar, index-detail, create-index, explore, feed, leaderboard, portfolio, profile, faucet, agents) wrap their root in `<ElevationProvider mode="layered">` and rely on role defaults; marketing and Layerbeat pages keep explicit levels.

Flat-only (do not add `elevation`): Sheet, Drawer, HoverCard, Tooltip, Alert, NavigationMenu/Command popups, Sidebar, Accordion, Table/DataTable (container flat; toolbar follows Button/Input), Chart, Bubble, Combobox, Attachment. Components not in the table follow the nearest role.

**Button / ButtonGroup context.** A `ButtonGroup` with an explicit `elevation` provides it to the buttons it contains (React `ButtonElevationContext` exported from `button.tsx`, Vue `BUTTON_ELEVATION_KEY` from the button barrel, Svelte `BUTTON_ELEVATION_CONTEXT` from the button module); a floating group hands `raised` to its items and takes `shadow-group-float` itself. A button resolves its level as own prop, then the group, then the scope (`useElevation`).

**Demos and docs.** Every component with `elevation` needs a second demo in all three ports showing flat / +1 / +2 and sunken (-1) for fields, cards, badges and buttons (overlays: floating only), like the kit boards. Demo files are named `<name>-elevation.*` (checked by `verify:matrix` `ELEVATION` / `AI_ELEVATION` lists). mdx: API row `elevation | "auto" \| "sunken" \| "flat" \| "raised" \| "floating" | "auto"` and an `## Elevation ✦` section (levels supported, what rises). The `theme` base rule is `[data-elevation=raised], [data-elevation=floating] { background-origin: border-box }`.


## 6. Per-framework conventions

Common: same item names/anatomy/props/`data-slot`/exports as the stock port; restyle by replacing classes; ✦ additive; same recipe strings in all three ports (port from React; Vue/Svelte differ only in primitive selectors). Imports between items stay inside Edmi paths. Icons are never imported from an icon package inside registry sources (except Vue, below).

**React** (`packages/react`, Base UI)
- Physical `registry/{ui,lib,hooks,blocks}/`, imported as `@/registry/edmi/ui/<x>` (the CLI rewrites only `@/registry/<style>/{ui,lib,hooks,components}`; `@/registry/ui/…` gets mangled). `cn` comes from the `cn` package. `utils` (registry:lib) ships and is a dependency of `edmi`.
- Polymorphism via `render={<a />}`, no `asChild`; links as buttons: `buttonVariants()` on `<a>`. Other Base UI attributes: `data-[highlighted]`, `data-[disabled]`, `data-[invalid]`/`aria-invalid`, `data-[starting-style]`/`data-[ending-style]`.
- Icons: `import { IconPlaceholder } from "@/edmi/icon-placeholder"` (local dev runtime, never shipped) with **all five** props: `<IconPlaceholder lucide="…" tabler="…" hugeicons="…" phosphor="…" remixicon="…" className="size-4" />`; self-closing JSX only (no `icon={X}`); copy names from stock base-nova JSON. The shadcn CLI rewrites it to the consumer's `iconLibrary`. Only the `edmi` base lists `@phosphor-icons/react` as dependency.
- Item `dependencies` list npm packages the file imports (`@base-ui/react`, `class-variance-authority`, `cn`, …). Blocks: `type: "registry:block"`, files under `registry/blocks/<name>/`.

**Vue** (`packages/vue`, Reka UI)
- Every item's files live in ONE dir `registry/ui/<name>/{Part.vue,index.ts}`; import via barrel `@/registry/edmi/ui/<name>`; `cn` from `@/registry/edmi/lib/utils`. Standalone files under `registry/lib` or `registry/hooks` get installed to `src/lib/registry/lib/…`, so ship **no utils item** and keep composables (`useX.ts`) inside the item dir. Pattern blocks also live in their item dir. `use-mobile` is skipped (sidebar uses `@vueuse/core` `useMediaQuery`).
- Icons: import from `@lucide/vue` only; the CLI rewrites to the consumer's `iconLibrary`, but only for names that are keys of <https://www.shadcn-vue.com/r/icons/index.json> (tried as-is, then without trailing `Icon`) and that have phosphor + lucide mappings. Unmapped names break typecheck (no `EyeOff`, `Columns3`, `Briefcase`, `Link`, `ThumbsUp`; use `EyeIcon`, `PanelLeft`, …). Enforced by `scripts/smoke/vue-icons.ts`. Phosphor default cannot be set by a registry item: it is `init --style nova --icon-library phosphor` (documented, smoke-tested). `packages/vue/components.json` stays `iconLibrary: lucide`.
- Props: `withDefaults(defineProps<…>(), { elevation: undefined })` (= `"auto"`) for components that take depth; `{ x: undefined }` for anything inheriting from `inject` or a cookie (`defaultOpen`, `defaultChecked`, `pressed`). Selectors `data-[state=…]` brackets (Reka puts `data-state=open` on triggers too), not shadcn-vue's custom variants. Polymorphic: `as-child`.
- `vue-tsc` is broken under Bun; `packages/vue/scripts/vue-tsc.mjs` patches a copy of tsc (used by `typecheck` and smoke). Never call plain `vue-tsc`.
- Scaffold flags that work: `shadcn-vue init --template vite --base reka --preset nova --css-variables --yes --no-reinstall`.

**Svelte** (`packages/svelte`, Bits UI)
- Physical `src/lib/registry/{ui,lib,hooks}/<name>/`; sources import `$lib/utils.js` and `$lib/registry/ui/<x>/index.js` (the CLI turns them into `$UTILS$`/`$UI$` at build and the consumer's aliases at install). No `utils` item (consumer's init provides `$lib/utils`). Docs alias `$lib` → `packages/svelte/src/lib`, `@edmi-svelte/ui/*` → `…/registry/ui/*`.
- Variants with `tv()` (never cva). Selectors `data-[state=open|checked|on|active]`, `data-[orientation=…]`, `data-[highlighted]`; polymorphic via the Bits `child` snippet; links as buttons: `buttonVariants()` on `<a>` or `<Button href>`. ReactNode props map to Snippets; callbacks to `on*` props; two-way via `$bindable`.
- Icons: `<IconPlaceholder lucide tabler hugeicons phosphor remixicon />` (dev-only shim `src/lib/components/icon-placeholder/` renders the `phosphor` prop via per-icon lazy `import.meta.glob` of `phosphor-svelte`, client-side after mount; never shipped), same mechanism as React. **Import it once per file** (the CLI's rewrite otherwise emits duplicate icon imports). `packages/svelte/components.json` sets `iconLibrary: phosphor`.
- Omit manifest `dependencies` for Svelte: `registry build` infers them with versions. Pattern items install flat (`registry:block`).
- The conversation group has no shadcn-svelte stock: built from recipes on Bits UI (engines ported to Svelte 5 runes, `use-*.svelte.ts`, live values via `.current`). Context for `elevation` uses getter objects so it stays reactive.
- Scaffold flags that work: `sv create svelte --template minimal --types ts --no-add-ons --no-install`, `sv add tailwindcss=plugins:none`, `shadcn-svelte init --preset b2fA` (code of "nova"; names are rejected) with aliases `#lib/*`, `sv add @shadcn-svelte/registry=demo:no`. All via `bunx --bun`.

## 7. Playbook

### 7.1 Add a new component or pattern (do all three ports)
1. Read DESIGN.md §4/§5 and the matching board (light + dark, flat + the elevation rows). Check the stock docs page of each port.
2. Get the stock source with the **official CLI**, never from memory. React: `bunx shadcn@latest add <name> --dry-run`, then `yes n | bunx shadcn@latest add <name>` (writes to `registry/ui/`). Vue (no `--dry-run`): `bunx shadcn-vue@latest add <name> -y </dev/null` only if you own every file it writes, else fetch `https://www.shadcn-vue.com/r/styles/new-york-v4/<name>.json`. Svelte: `bunx --bun shadcn-svelte@latest add <name> --no-deps-install --overwrite -y </dev/null` (or `https://shadcn-svelte.com/registry/styles/nova/<name>.json`). Afterwards `git status`: delete untracked stock deps you do not own, `git checkout --` tracked files you did not mean to change, revert `package.json`/`bun.lock`/`components.json` if the CLI touched them. If the CLI crashes (shared bunx cache corruption), take the stock source from the registry JSON the CLI reads (`https://ui.shadcn.com/r/styles/base-nova/<name>.json`). No stock counterpart (✦, patterns, conversation): build from `recipes.ts` + `kit.css` + the reference boards.
3. Restyle React first: keep anatomy/props/`data-slot`/exports; inline recipe classes; Base UI selectors; ✦ variants additive; add `elevation` per section 5 ("Elevation (v4)") with the role the table lists, and `"elevation"` in `registryDependencies`; icons via IconPlaceholder; control height `h-9`.
4. Port to Vue and Svelte with the same recipe strings and each port's conventions (6).
5. Manifest: item in `registry.manifest/<group>.ts` (+ React files), Vue file list in `<group>.vue.ts`, Svelte in `<group>.svelte.ts`:
   ```ts
   { name: "x", title: "X", description: "…", type: "registry:ui", categories: ["Display"],
     registryDependencies: ["button"],           // Edmi names only
     docs: "Replaces the stock x: `shadcn add @edmi-ui/x --overwrite`.",
     frameworks: { react: { files: [{ path: "registry/ui/x.tsx" }], dependencies: ["@base-ui/react", "class-variance-authority", "cn"] } } }
   // x.vue.ts:     x: { files: [{ path: "registry/ui/x/X.vue" }, { path: "registry/ui/x/index.ts" }], dependencies: ["reka-ui", "class-variance-authority"] }
   // x.svelte.ts:  x: { files: [{ path: "src/lib/registry/ui/x/x.svelte" }, { path: "src/lib/registry/ui/x/index.ts" }], registryDependencies: ["button"] }
   ```
   Per-framework `type`, `registryDependencies`, `cssVars`, `css`, `config`, `skip` overrides are allowed. A new group/file must be merged in `registry.manifest/index.ts`. Add the item name to `REQUIRED` in `scripts/verify-matrix.ts` (and to its raised list if applicable).
6. Docs: demos `apps/docs/src/demos/{react/x.tsx,vue/x.vue,svelte/x.svelte}` (+ `x-elevation.*` showing flat / raised (+1) / floating (+2) and sunken (-1) where the component supports it), page `apps/docs/src/content/docs/components/<group>/x.mdx` from `apps/docs/templates/component.mdx`. **Quote the frontmatter description** (an unquoted colon breaks the YAML). Sections: `<ComponentDemo name="x" />`, API table (include `elevation | "auto" \| "sunken" \| "flat" \| "raised" \| "floating" | "auto"`), `## Elevation ✦` (levels supported, what rises) with a link to the Elevation guide (`/edmi-ui/getting-started/elevation/`) and `<ComponentDemo name="x" demo="x-elevation" />`, `## ✦ Edmi additions`. Demos must import registry code via `@edmi-react/ui/x`, `@edmi-vue/ui/x`, `@edmi-svelte/ui/x`; avoid importing icon or third-party packages the docs app does not depend on. Restart `astro dev` after adding a brand-new demo file (islands are generated at config load).
7. Preview page: add the demo to `packages/<fw>/src/preview/<group>.*` and compare against the board.
8. Skill: add a `USE_WHEN` line for the item in `scripts/gen-skill.ts`, then `bun run scripts/gen-skill.ts` (the test fails otherwise); new props/variants/✦ additions go into `skills/edmi-ui/references/components.md` (and `elevation.md` if it takes `elevation`; add it to the ELEVATION lists of `verify-matrix.ts`).
9. `bunx changeset` (see 9). Run the gates (8). Commit one component per commit, `feat(<fw or all>/<group>): <name>`.

### 7.2 Modify an existing component
Change React, then mirror the identical change in Vue and Svelte (diff class strings after normalising selectors). Update demos/mdx if the API changed. Never leave the ports out of sync; if a port truly cannot, say so in the PR and a decision line (10). Changeset: patch for style fixes, minor for new props/variants, major for removals.

### 7.3 Change tokens or recipes
`packages/tokens/src/{tokens.css,theme.css,tokens.json,recipes.ts,kit.css}` mirror `refs/edmi-ui`; keep them verbatim (excluded from Biome). Spec changes originate in `refs/edmi-ui`; copy, then update every component that inlines the changed strings (grep the old class). Renamed/removed token or default-look break ⇒ major (minor while 0.x). Re-run all gates and visual QA.

### 7.3b Add a base color or a theme (accent)
Copy `packages/tokens/src/base/slate.css` (or `themes/ocean.css`) to `base/<name>.css` (`themes/<name>.css`), change the values, keep both selectors (`[data-base="<name>"]` + `.dark[data-base="<name>"]`, or `data-theme`), and add the `exports` entry in `packages/tokens/package.json` (`./base/<name>.css`). That is all: `bun run gen` emits `theme-<base>-<name>` items, `verify:matrix` expects them, `astro.config.mjs` imports the file for the docs, and the Themes page shows the new option. Rules: both modes, status colors (destructive/warning/success/info) never change, components never reference the name. Add a changeset (minor).

### 7.4 Docs site (`apps/docs`)
- Astro 7 + Starlight, Tailwind v4 (`@tailwindcss/vite`). **Framework is global**: chosen once in the header select (or the small select in a demo toolbar), stored in `localStorage["edmi-framework"]`, mirrored to `<html data-fw>` by a head script (`fwSync` in `astro.config.mjs`, also handles `[data-fw-set]` buttons) and announced with the `edmi-framework` window event. Framework-specific blocks are `[data-fw-panel="<fw>"]` wrappers shown/hidden by pure CSS on `html[data-fw]` (`global.css`), so there is no flash and no per-component framework JS. A block that lacks a framework renders `[data-fw-note="<fw>"]` ("Not available in X yet", with buttons to switch) instead of an empty box.
- Component page contract (every `components/<group>/<name>.mdx`, scripted from `templates/component.mdx`): first `<ComponentDemo name="x" />`, then `## Installation` (`ComponentInstall`: CLI | Manual toggle, mode in `localStorage["edmi-install-mode"]`), `## Usage` (`ComponentUsage`: own imports + a trimmed copy of the primary demo markup, built by `src/lib/demo.ts` `usageSnippet`), `## Component source` (`ComponentSource`: registry files, collapsed behind "Expand" above 28 lines), then Elevation / API / Edmi additions. Those headings are real markdown so they appear in the right TOC. `ComponentDemo` (`name`, optional `demo`) is only a card: one `Preview | Code` segmented control, framework select, theme toggle, StackBlitz link; secondary demos (`demo="x-elevation"`) use the same card. Shared helpers: `src/lib/demo.ts` (import rewriting, sources, usage snippet).
- Demo islands: Astro only hydrates statically imported components, so `plugins/gen-islands.mjs` generates a wrapper per demo file into `src/components/islands/<fw>/` at config load (gitignored).
- JSX scoping: `react({ include })` in `astro.config.mjs` lists only React paths (`**/packages/react/**`, `**/src/demos/react/**`, landing, thumbs, `islands/react`). A new directory with React `.tsx` must be added there, or it loses Fast Refresh/hydration filtering; Vue/Svelte files must never match. `vueNoReactRefresh()` (Vite plugin) complements it, see section 11.
- Resolution: `plugins/edmi-resolve.mjs` aliases (`@/registry/edmi/*`, `@/*`, `$lib/*` resolve inside the importing package; `@edmi-<fw>/*` anywhere); shared libs (react, vue, svelte, base-ui, reka-ui, bits-ui, sonner variants…) are `resolve.dedupe`d and listed as `apps/docs` dependencies so demo and registry file share one instance. The manifest is loaded natively at runtime (`src/lib/manifest.ts`).
- Theme toggle: Starlight sets `data-theme`; a head script and `ThemeSelect` map it to `.dark` on `<html>`. Preview cards can be forced light with `.edmi-light`. Starlight overrides (Header/Sidebar/PageFrame/Hero/ThemeSelect) give a shadcn-like layout in Edmi tokens; the landing page has a Flat/Layered toggle (the showcase islands wrap themselves in an `ElevationProvider` that follows the shared state). Registry previews get a scoped Tailwind-preflight subset in `global.css`. Fonts load via a Google Fonts `<link>` in Starlight `head`.
- Components index: `src/pages/components/index.astro` (Starlight page via `StarlightPage`, not an mdx) lists every `components/<group>/*.mdx` item grouped like the sidebar (plus a hand-picked "New" row), with a plain-script filter. Each card renders the primary React demo server-side with `react-dom/server` `renderToString` (no `client:` directive, no per-card JS), scaled to fit by a tiny inline script (`--s`); overlay-style items use static open-state mocks in `src/components/thumbs/index.tsx` (keyed by item name; add one when a demo renders closed or empty in SSR). A demo that throws in SSR falls back to an icon tile and is logged as `[components-index]` at build. Cards are `div`s with a stretched title link (demos contain `<a>`, so the card itself must not be an anchor). Header "Components" and the sidebar "Overview" entry point at `/components/`.
- `usageSnippet` (`src/lib/demo.ts`) derives the Usage tab from the primary demo: imports are reduced to identifiers the shown markup uses, demo-only state/data expressions, `{#snippet}` helpers and `IconPlaceholder` are stripped (icons become the Phosphor name), and trimming keeps tags balanced. For a component whose derived snippet is poor, fix the demo markup rather than special-casing.
- **Themes page** (`src/pages/themes/index.astro`, splash template, `src/components/themes/ThemeCustomizer.tsx`): data comes from `@edmi-ui/tokens/css-vars` via `src/lib/theme-data.ts` (bases, themes, swatches, ready-made CSS per combination). Header actions **Copy CSS** (CSS / Tailwind v4 tabs) and **Install** (framework + package-manager tabs) open Edmi `Dialog`s with `ai/code-block`; the toolbar is Edmi `Tabs`; the preview is scoped (`data-base`/`data-theme`/`--radius`/`.dark`).
- **Docs information architecture**: header nav is exactly Getting Started, Components, Examples, Themes, Changelog (`overrides/Header.astro`; below 62rem it collapses into the Edmi dropdown `overrides/MobileNav.tsx`). Only Getting Started (`/getting-started/...`: Introduction, Installation/React|Vue|Svelte, Theming, Rules) and Components (`/components/`: Overview, **UI** and **AI** headings, one collapsible category per `COMPONENT_GROUPS`/`AI_GROUPS` entry) have a sidebar. It is generated by `plugins/sidebar.mjs` from the content folders and rendered section-isolated by `overrides/Sidebar.astro` + `SidebarEntries.astro` (native `<details>`; the category with the current page is open, others start closed, choices persist in `localStorage["edmi-side"]` via a tiny inline script). Themes, Examples, Changelog and the landing use `template: "splash"` (no sidebar); full-width ones wrap content in `.edmi-wide` (widens `--sl-content-width`, see end of `global.css`). Moved routes are `redirects` in `astro.config.mjs` (`/getting-started/{react,vue,svelte}` -> `/getting-started/installation/*`, `/theming` and `/rules` -> `/getting-started/*`). Search label "Search docs" comes from `src/content/i18n/en.json`.
- Package-manager agnostic docs: never hard-code `bunx`/`bun add` in docs. Command builders live in `apps/docs/src/config.ts` (`dlx`, `pmAdd`, `cliCommand`, `installCommand`; npm → `npx`, pnpm → `pnpm dlx`, yarn → `yarn dlx`, bun → `bunx`, `bunx --bun` for shadcn-svelte; installs → `npm install`/`pnpm add`/`yarn add`/`bun add`). Use `<PmCommand fw=… args=… />` or `<PmCommand add={[…]} />` (`src/components/PmCommand.astro`) in mdx/astro. One global choice (default npm) in `localStorage["edmi-pm"]`, set as `html[data-pm]` by a head script in `astro.config.mjs`; panels are CSS-driven (`[data-pm-panel]`, `[data-pm-set]` buttons), so there is no flash.
- Do not use Starlight `<Tabs>`/`<Steps>`/`<FileTree>` (fail at prerender). `@edmi-ui/docs` build goes under base `/edmi-ui/` and builds a Pagefind index.

### 7.5 Examples (`examples/<fw>`)
Stockbreak Markets page + app shell (dashboard and navbar layouts, cookie layout picker, theme toggle). They install Edmi **only through the CLI** via `examples/install.sh <fw>` (default `EDMI_URL=http://localhost:4321/edmi-ui`, i.e. the docs dev server must serve `/r/<fw>`), and **never import `packages/*`**. Stockbreak example pages are layered: the app root is wrapped in `<ElevationProvider mode="layered">` and components take their role levels (no per-component `elevation` props except deliberate overrides). Biome ignores installed files (`src/components/ui`, installed blocks, `lib/utils.ts`, hooks). After a re-install restore `components.json` registry URLs to the GitHub Pages URL. Smoke: `bash scripts/smoke/example-<fw>.sh`. `bash scripts/reinstall-examples.sh [fw…]` rebuilds the registry locally, runs `install.sh` against the real `examples/<fw>` and restores the `components.json` registry URLs; afterwards `git checkout -- bun.lock` if bun touched it and run `bunx biome check --write` on the example CSS (the CLI writes unformatted CSS). Positive values on example pages use `success` (`text-success-text`, `bg-success`), not `brand`.
`examples/layerbeat-<fw>` is a second example per port: the Layerbeat "Create a BeatVPS" page (DESIGN §7), theme Slate · Ocean installed with `@edmi-ui/theme-slate-ocean` after `@edmi-ui/theme` (Svelte: URL form), an always-dark navy sidebar made with a scoped `class="dark"` on the sidebar subtree, mock data in `src/data/layerbeat.ts`. Install with `EXAMPLE_DIR=examples/layerbeat-<fw> examples/install.sh <fw>` plus the theme item; smoke: `bash scripts/smoke/example-layerbeat-<fw>.sh` (picked up by `all.sh`). Pages: React `src/pages/create-beatvps.tsx`, Vue `src/pages/CreateBeatVps.vue`, Svelte `src/lib/pages/create-beatvps.svelte`. Vue installs with `examples/install.sh vue` + `shadcn-vue add @edmi-ui/theme-slate-ocean --overwrite`; Svelte with `examples/install.sh svelte` + `shadcn-svelte add <EDMI_URL>/r/svelte/theme-slate-ocean.json --overwrite`. Biome ignores installed CLI paths with `examples/*` globs (no nested biome.json). `install.sh` also installs the Stockbreak pattern blocks; delete the unused ones from the Layerbeat example afterwards.

### 7.7 Consumer agent skill (`skills/edmi-ui`)
An installable Agent Skill for people who USE Edmi (`npx skills add viandwi24/edmi-ui`, the `skills` CLI discovers `skills/<name>/SKILL.md`; also `--list`, `--skill edmi-ui`, `-a <agent>`, `-g`). Format: `SKILL.md` (frontmatter `name: edmi-ui` = folder name, `description` <= 1024 chars with trigger words; body < 500 lines) plus `references/*.md` loaded on demand, one level deep and each linked from SKILL.md.
- Files: `install.md`, `upgrading.md`, `theming.md`, `elevation.md` (philosophy first, then levels, roles, layered mode, nesting; keep it aligned with section 5 and the docs guide `getting-started/elevation.mdx`), `components.md`, `ai.md`, `rules.md`, `frameworks.md`.
- Generated blocks: `components.md` catalog (`<!-- BEGIN GENERATED: catalog -->`) and the `elevation.md` list are rewritten by `bun run scripts/gen-skill.ts` from `registry.manifest/index.ts`; the "use when" text is the `USE_WHEN` map in the script; the elevation list is parsed from the `ELEVATION`/`AI_ELEVATION` arrays of `verify-matrix.ts`. `scripts/skill.test.ts` (in `bun test`) fails when an item has no entry, a block is stale, frontmatter is invalid, a reference is unlinked, or content mentions `refs/`, `@/registry/edmi`, `packages/*` or the upstream AI library name.
- Content rules: consumer paths only (`@/components/ui/button`), verified against the registry source, package-manager agnostic (npx default), English, imperative, concise. Never mention the upstream AI component library.
- When you change install flows, theming, tokens, `elevation` rules or the docs getting-started pages (Elevation, Rules, Theming, Upgrading), update the skill and the docs pages `getting-started/skills.mdx` and `getting-started/upgrading.mdx` in the same change. Cannot be tested end to end before the repo is pushed (`skills add` reads GitHub); locally use `bunx skills add ./ --list` with a temporary `HOME`.

## 7b. Edmi AI pack (`ai-*` items)

Spec (local, gitignored `refs/edmi-ui`): DESIGN.md §4 rules 16-17 and §5b, REVISIONS.md (v3 #1-#8), `css/ai.css` (= `packages/tokens/src/ai.css`, plain-CSS reference for the visuals), boards `screens/edmi-ai-kit/ai-0N-*-{light,dark}.png` (1440px wide, tall: crop with `sips -c 650 1440 --cropOffset <y> 0 <png> --out <crop.png>` and Read the crops), exact markup and values in `reference/Ai*{L,D}.dc.html`. The AI pack is restyled Vercel AI Elements (Apache-2.0) plus Edmi ✦ additions; **keep NOTICE accurate**. Attribution lives only in `NOTICE` and `licenses/` (no per-file headers): README, docs pages, the landing and changesets never name the upstream projects (user decision).

### Items and naming
- Registry item `ai-<stock name>` (`ai-message`, `ai-prompt-input`, ...), namespace `@edmi-ui`; aggregate `ai-all` (Meta, every `ai-*` item for that framework). `all`/`edmi` never include AI items (the generator skips categories starting with `AI · `); `ai-all` does not include `all`.
- Categories (= manifest group files, boards): `AI · Chat` (`ai-chat.ts`: conversation, message, prompt-input, suggestion, attachments, model-selector, context, shimmer), `AI · Agent` (`ai-agent.ts`: reasoning, chain-of-thought, tool, confirmation, sources, inline-citation, plan, task, queue, checkpoint), `AI · Code` (`ai-code.ts`: agent, artifact, code-block, commit, environment-variables, file-tree, jsx-preview, package-info), `AI · Runtime` (`ai-runtime.ts`: sandbox, schema-display, snippet, stack-trace, terminal, test-results, web-preview), `AI · Voice` (`ai-voice.ts`: audio-player, mic-selector, persona, speech-input, transcription, voice-selector), `AI · Workflow` (`ai-workflow.ts`: canvas, node, edge, connection, controls, panel, toolbar, image, open-in-chat), `AI · Patterns` (`ai-patterns.ts` ✦: artifact-card, artifact-stack, artifact-viewer, session-panel, agent-avatar, prompt-input-agent, chat-composer, chat-header), `AI · Utilities` (`ai-utilities.ts`: React-only `ai-use-controllable-state`). Suggestion `variant="card|chip"`, Conversation `variant="home"` and response typography are parts of `ai-suggestion`, `ai-conversation`, `ai-message`, not separate items.
- Components keep the AI Elements names and anatomy (`Message`, `PromptInput`, `Tool`, ...) with no prefix; `data-slot` is `ai-<kebab>` for AI-specific parts (`ai-message`, `ai-prompt-input-submit`). When a file needs both the ui and the ai component, alias on import (`Message as UiMessage`).
- `ui/` NEVER imports `ai/`. `ai/` builds on ui items (table in DESIGN §5b: Conversation on `message-scroller`, Message on `message` + `bubble`, Attachments on `attachment`, Model Selector on `command` + `dialog`, Confirmation on `alert` + `button`, Code Block is the canonical code block). Keep them thin layers, never copies.
- `registryDependencies` = Edmi names only: ui items (`button`) or other AI items (`ai-shimmer`). Use `optionalDeps: ["ai-use-controllable-state"]` (React only) for the controllable-state hook so Vue/Svelte do not depend on a skipped item.

### Where files live (the CLIs decide, verified in their source)
| | source dir | installs to | notes |
|---|---|---|---|
| React | `registry/components/ai/<name>.tsx`, hooks `registry/hooks/ai/*.ts` | `components/ai/`, `hooks/ai/` | item `type: registry:component` (hook: `registry:hook`); imports `@/registry/edmi/components/ai/<x>`, `@/registry/edmi/ui/<x>`, `@/registry/edmi/hooks/ai/<x>` are rewritten to the consumer aliases (the CLI maps `/registry/<style>/components` to the `components` alias and keeps the rest of the path) |
| Vue | `registry/components/ai/<name>/<Part>.vue` + `index.ts` | `components/ai/<name>/` | `registry:component`; nested path comes from the file path after `components`; `@/registry/edmi/components/ai/<x>` is rewritten |
| Svelte | `src/lib/registry/ai/<name>/<part>.svelte` + `index.ts` | `$lib/components/ai/<name>/` | `registry:component` with an explicit per-file `target: "ai/<name>/<file>"` (shadcn-svelte flattens targets otherwise); **sibling AI imports must be relative** (`../shimmer/index.js`), because the Svelte builder only rewrites `ui`, `hooks`, `utils` |
- Helpers in `registry.manifest/ai-shared.ts`: `aiItem({...})` (item), `aiReact(name, deps, extraFiles)`, `aiVue(name, parts, deps)`, `aiSvelte(name, files)` (adds the targets). Item-level `docs`/`type`/categories come from `aiItem`; do not repeat them.
- CLI gotchas: never name an AI file/dir `ui*` or `lib*` after `components/ai/` (the React/Vue import rewriter matches `/ui` and `/lib` prefixes anywhere in the path); no two items may write the same file.

### Per-item procedure (every port; do all three unless the item is a documented `skip`)
1. Read the board (light + dark, flat + elevation rows), the matching `reference/Ai*.dc.html` markup and DESIGN §4/§5b. Stock source: `bun run scripts/ai-fetch-stock.ts` (React = Vercel AI Elements, Vue = ai-elements-vue, Svelte = Svelte AI Elements, partial); the `example-*` JSON files are the official demos. **Port from the React stock first**, then Vue/Svelte (take the Vue/Svelte stock as a starting point where it exists, but the React file is the source of truth for props/anatomy).
2. Restyle: classes from `packages/tokens/src/recipes.ts` + `ai.css` translated to Tailwind utilities (tokens only, no hex; no `/NN` opacity on bg/border; solid soft tints `color-mix(in srgb, var(--x) 30%, var(--popover))`; no blurred shadows; flat by default; `elevation` only where §5/5b lists it). AI rules: no assistant avatar by default, status/shimmer text inside a ghost bubble, response typography 15/1.65 (~68ch), terminal always dark (oklch literals from `ai.css .ai-term`, not themed), syntax colors from chart tokens, documents render as paper (white page) in every mode, floating chips solid (`--popover` + 1px border).
3. Framework port rules: React (Base UI): replace Radix `asChild` with `render={...}`, `onSelect` with `onClick` on menu items, HoverCard `openDelay/closeDelay` with `delay/closeDelay` on the **Trigger**, Radix `useControllableState` with `@/registry/edmi/hooks/ai/use-controllable-state`; no `@radix-ui/*` anywhere. Vue (Reka): `@lucide/vue` icon names must be keys of the shadcn-vue icon index (section 6), controllable state via `useVModel` from `@vueuse/core`. Svelte (Bits): `$bindable`, snippets, `IconPlaceholder` imported **once per file**.
4. No attribution header in source files (user decision): attribution lives only in `NOTICE` and `licenses/`. Do not add `Derived from …` comments.
5. Manifest: React entry in `registry.manifest/ai-<cat>.ts` (replace the item's `react` via `aiReact`), Vue/Svelte entries in `ai-<cat>.vue.ts` / `ai-<cat>.svelte.ts` (`entries["ai-<name>"] = aiVue(...)` / `aiSvelte(...)`); `dependencies` = every npm package imported (`cn`, `ai`, ...); update `registryDependencies` if the real imports differ. Remove the item from `scripts/ai-pending.json` for that framework (the matrix FAILS on a stale entry, so this cannot be forgotten). Truly impossible: `{ skip: true }` in the overlay plus the reason in the docs page and the decisions log (the matrix shows `–`).
6. Demos: `apps/docs/src/demos/<fw>/ai-<name>.*` (+ `ai-<name>-elevation.*` when the item has `elevation`, and the name must be in `AI_ELEVATION` in `scripts/verify-matrix.ts`; extra variants as `ai-<name>-<variant>.*`). Import registry code through `@edmi-react/components/ai/<name>`, `@edmi-vue/components/ai/<name>`, `@edmi-svelte/ai/<name>` (these map to the consumer paths in the shown code). Use the stock `example-*` content as a base; sample content in the Stockbreak voice (NVDAx, MAG4, keeper). Page `apps/docs/src/content/docs/components/ai-<cat>/ai-<name>.mdx` from `apps/docs/templates/ai-component.mdx` (quoted description, one "built on" line, API table, `## Raised ✦`, `## ✦ Edmi additions`). Restart `astro dev` after a new demo file.
7. Preview: `packages/<fw>/src/preview/ai-<cat>.*` (one page per category, light + dark side by side) compared to the board; check real interaction (menus open, hover cards, dialogs).
8. Gates: `bun run gen:strict && bun run typecheck && bun run lint && bun test && bun run build:registry && bun run verify:matrix   # AI items still listed in scripts/ai-pending.json show as `…`; the list must be empty before a release`, the port's smoke script, docs build. Changeset: one `@edmi-ui/registry-<fw>` minor per category and port.

### Dependencies (pre-installed per port; do not edit package.json)
- React: `ai` (types: **v7**, `LanguageModelUsage.outputTokenDetails.reasoningTokens` / `inputTokenDetails.cacheReadTokens`; `ChatStatus`, `UIMessage`, `FileUIPart`, `ToolUIPart`, `Experimental_GeneratedImage`, `Experimental_TranscriptionResult` exist), `zod`, `streamdown` + `@streamdown/{code,math,mermaid,cjk}`, `shiki`, `motion`, `@xyflow/react`, `use-stick-to-bottom` (installed but unused: Conversation builds on message-scroller), `tokenlens`, `nanoid`, `media-chrome`, `@rive-app/react-webgl2`, `ansi-to-react`, `react-jsx-parser`.
- Vue: `ai`, `nanoid`, `tokenlens`, `shiki`, `@vue-flow/{core,background,controls,node-toolbar}`, `motion-v`, `media-chrome`, `@rive-app/webgl2`, `ansi-to-vue3`, `vue-stream-markdown`, `vue-stick-to-bottom`, `@vueuse/core`.
- Svelte (all devDependencies): `ai`, `nanoid`, `tokenlens`, `shiki`, `@shikijs/{themes,langs}`, `@xyflow/svelte`, `@rive-app/webgl2` (write a thin Svelte wrapper), `media-chrome`, `svelte-streamdown` (markdown/streaming renderer), `runed`, `anser` (ANSI for Terminal), `mode-watcher`.
- `apps/docs` has the union. If an item needs a package not listed, stop and ask (do not edit package.json); `resolve.dedupe` / `ssr.noExternal` for new libs live in `apps/docs/astro.config.mjs`.
- Consumer CSS: Streamdown ships Tailwind classes in its dist; React consumers add `@source "../node_modules/streamdown/dist/*.js";` (documented on the `ai-message` page; already in `packages/react/src/index.css` and the docs `global.css`).

### 7.6 Docs examples (`apps/docs/src/examples`)
Spec: `refs/edmi-ui/EXAMPLES.md` (one live page per screen, light/dark, stone/slate, green/ocean). Short guide: `apps/docs/src/examples/README.md`.
- **Source of truth**: `src/examples/index.ts` (slug, title, tag AI|App|Marketing|Theme, board, thumb, `frameworks` = all three, `uses`). It drives the `/examples` grid + tag filter, the routes, the sidebar group (read by `astro.config.mjs`) and `scripts/verify-examples.ts` (run by `bun run verify:matrix`).
- **Folder** `src/examples/<slug>/`: `data.ts` (ONE shared sample-data file, framework-free, local structural types, imported as `./data` by all three), `react.tsx` (default export), `vue.vue`, `svelte.svelte`, optional helpers in `react/ vue/ svelte/` of that port. Thumbnails `public/examples/<thumb>-{light,dark}.png` (~800px, copied from `refs/` with `sips -Z 800`; `refs/` is gitignored).
- **Allowed imports**: registry items only through `@edmi-react/{ui,components/ai,blocks}/…`, `@edmi-vue/{ui,components/ai}/…`, `@edmi-svelte/{ui,ai}/…`, icons per 6 (React/Svelte `IconPlaceholder`, Vue `@lucide/vue`). No `packages/*`, `../`, CSS files or `<style>` (verify-examples enforces); Tailwind utilities on layout wrappers are fine. Missing piece = registry gap, report it. The Code tab rewrites aliases to consumer paths (`lib/demo.ts`).
- **Render**: `plugins/gen-islands.mjs` also writes `components/islands/examples/<slug>/<fw>.astro` (`client:load`). The bare route `pages/examples/[slug]/render/[fw].astro` loads `styles/example-render.css` (own Tailwind entry: preflight + tokens + base/theme CSS, so portals are styled) and runs inline in an iframe: `<html>` gets `.dark`, `data-base`, `data-theme`, `--radius` from the query (`mode, base, theme, radius`) and from `postMessage({type:"edmi-example", state})`, so knobs never reload the frame. Page root: `min-h-svh` (or `h-svh`) + `bg-background text-foreground`; never set the knob attributes in the example.
- **Viewer** `components/ExampleViewer.astro`: toolbar (mode, base, theme, radius, framework select synced with the global `edmi-framework` preference, desktop/tablet 820/mobile 390 presets, drag handle, Open ↗), Preview/Code tabs (Starlight `<Code>`, file tabs: main, helpers, data.ts). The framework switch only swaps the iframe `src`.
- **Thumbnails are generated, not copied**: `bun scripts/example-thumbs.ts --url <docs url> [slug…]` (procedure in the examples README) screenshots the live `/examples/<slug>/render/react/` in light and dark (respecting `defaultBase/defaultTheme/defaultMode`) at 1440x1080 and stores 800px PNGs in `public/examples/`. Re-run it after any visual change to an example; thumbnails must match the live render.
- **Stockbreak layouts**: the page examples render the navbar layout; `markets-sidebar` is the sidebar app shell variant (separate folder, own `data.ts`). Viewer: zoom (logical iframe width stays the preset width via `--z`), full-page overlay (Esc exits, not persisted).
- **Add one**: README steps; restart `astro dev` after adding files (islands generated at config load). Thumbnails: crop the board with `sips -c H W --cropOffset Y X`. Compare each port in light + dark, stone·green + slate·ocean against the screenshot.
- Gotchas: the React/Vue conversation items render client-side (SSR HTML is empty until hydration); Vue `MessageResponse` fades words in (screenshots right after load look dim); the Svelte `IconPlaceholder` dev shim renders real Phosphor icons client-side after mount (SSR HTML has none).

## 8. Verification gates

Run on the final tree; all must exit 0 before claiming done:
```bash
bun run gen:strict
bun run typecheck
bun run lint
bun test
bun run build:registry && bun run verify:matrix
bun run --filter @edmi-ui/docs build          # docs + Pagefind under /edmi-ui/ (needs build:registry first)
bash scripts/smoke/all.sh                  # or the single smoke script for the port you touched
bun run pack:registries                    # when touching distribution/EDMI_URL logic
bunx changeset status                      # a changeset exists for user-visible changes
```
CI (`ci.yml`) runs: `bun install --frozen-lockfile`, `gen:strict`, `typecheck`, `lint`, `test`, `build:registry`, docs build, `scripts/smoke/all.sh` with `EDMI_URL=https://viandwi24.github.io/edmi-ui`.

Visual QA (UI changes): run the port's preview (or `astro preview` for docs) and compare each affected board `refs/edmi-ui/screens/edmi-ui-kit/<NN>-*-{light,dark}.png` (boards: 01 Foundations, 02 Themes, 03 Actions, 04 Forms text, 05 Forms choice, 06 Display, 07 Feedback/Overlays, 08 Menus/Navigation, 09 Layout/Disclosure, 10 Data, 11 Conversation, 12 Patterns; Layerbeat example in `screens/layerbeat-example/`) in light **and** dark, flat, layered and each `elevation` level. Also run computed-style audits (elevation/bevel): no hard `0 Npx 0` lip anywhere; no non-inset blurred `box-shadow` except the single floating drop and the sunken inset; raised/floating = the token values (`--bv-*`) with a transparent border; every gradient on a bordered control has `background-origin: border-box`; sunken = `--sk-*`; only the active part of tabs/segmented/pagination/calendar/switch/slider rises; a nested surface resolves flat; flat demos contain no gradient/bevel; control heights 36/32/42; table numbers mono and right-aligned. Grep the registry for leftovers (`h-[38px]`, `border-b-lip`, `shadow-btn-outline`, `shadow-[0_2px_0`, `shadow-card|pop|dialog`, a `raised` prop). Check real clicks on interactive demos (menus open, toast fires). Pressed/focus/open states and portalled popups in dark are easy to miss; verify or state that you did not. Examples vs `refs/edmi-ui/screens/stockbreak-example/markets-{light,dark}.png`. Not verifiable without a remote: StackBlitz links.

## 9. Versioning and release

- Changesets, **one fixed group**: `@edmi-ui/tokens`, `@edmi-ui/registry-{react,vue,svelte}` always share a version. Private source packages, docs and examples are in the `ignore` list; name `@edmi-ui/tokens` (or a registry package) in your changeset, not them. Add one `.changeset/<name>.md` per change (`bunx changeset`; if it spins at 100% CPU use `bunx --bun changeset`).
- Bump: **patch** styling fix inside a component, docs, a ✦ variant that only adds a value; **minor** new component/token/prop/variant (and the v2 default-look change); **major** token renamed/removed, variant/prop removed, default look change breaking layouts, primitive library change. Pre-1.0 (`0.x`): minor may be breaking.
- Flow and one-time setup (git remote, Pages = GitHub Actions, first local publish of the 4 packages, npm Trusted Publisher per package) are in [RELEASING.md](RELEASING.md). `release.yml` (changesets/action) opens the "Version Packages" PR; merging publishes with provenance and creates ONE GitHub Release `v<version>` (changesets/action has `create-github-releases: false`, `push-git-tags: false`; `softprops/action-gh-release@v3` publishes the tag+release with notes from `scripts/release-notes.ts` = `bun run release:notes <version> <file>`, merged from the four CHANGELOGs). Old per-package releases/tags can be deleted manually in the GitHub UI. Zero repository secrets: only `GITHUB_TOKEN` + OIDC. `pages.yml` deploys docs + latest registries (`withastro/action`, `deploy-pages`).
- Open item needing user confirmation: `release.yml` keeps `actions/setup-node` (Node 22) + `npm i -g npm@latest` solely because npm Trusted Publishing needs real npm >= 11.5.1; everything else is bun. Pending release steps (remote, Pages, first publish, provenance and CDN verification) are listed in RELEASING.md.

## 10. Decisions log (still binding, with why)

Environment and process
- npm scope is `@edmi-ui` (`@edmi-ui/tokens`, `@edmi-ui/registry-*`, private workspaces too) because the `edmi` npm org is unavailable. The shadcn registry namespace is ALSO `@edmi-ui` (`@edmi-ui/<item>`, `registries["@edmi-ui"]`, previously `@edmi`), identical to the npm scope for consistency. Why: user decision (breaking for consumers: rename the `@edmi` key in components.json).
- Bun-only, no Node, no `gh`. Any CLI failing under bun: try `bunx --bun`, then report the exact command and error before switching approach. Why: user decision.
- No git remote yet; commit locally on `main`. GitHub owner `viandwi24`, Pages `https://viandwi24.github.io`, base `/edmi-ui`.
- Official scaffolders only; copy commands from the tool's current docs; hand-write only what no CLI generates. Why: flags drift, CLI output is the convention.
- Decisions not covered here: choose the option closest to stock shadcn behaviour and record it in this section.

Spec and design
- **Elevation v4 (handoff `refs/edmi-ui-update-4`, 2026-10-04): the boolean `raised` is removed without alias** (user decision) and replaced by the enum `elevation="auto|sunken|flat|raised|floating"` on every component that can take depth. Why an enum: four levels (sunken -1, flat 0, raised +1, floating +2) and an `auto` that resolves through a scope; booleans cannot express that. Layered mode is an `ElevationProvider` (registry item `elevation`, context per framework that also renders `data-elevation`), role defaults come from `ROLE_LEVEL`/`resolveElevation` (copied from the recipes), nesting drops a surface inside a raised/floating surface to flat. Hard lips are replaced by the bevel model; dark ladder B applies to the stone base; legacy lip/edge/shade tokens stay for the example pages only. Breaking => changeset minor (0.x) with a migration note. Supersedes the "Menubar raised" and "raised" lines below.
- Elevation v4 W2 (display, overlays, navigation): Card/InsetPanel/EmptyMedia/Popover/Dialog/AlertDialog/DropdownMenu/ContextMenu/Select content/Sonner/Tabs/Pagination/Menubar take `elevation`. Pattern and AI items that only forward `raised` to a Card keep their own legacy boolean `raised` in Vue/Svelte (forwarded as `elevation="raised"`); in React their props now come straight from Card, so React demos use `elevation`. The patterns/AI wave unifies them. Why: stay inside the display/overlays/navigation scope.
- Design changes come only from a handoff document exported from the design app into `refs/*`; no in-repo redesigns (e.g. an InsetPanel "elevation scale" proposal was cancelled for this reason; v4 elevation arrived as a handoff). Why: user decision, keeps code and design app in sync.
- Binding spec is `refs/edmi-ui` v2 (flat by default, control height `h-9`; depth is now the v4 elevation system, see section 5). Why: user replaced the spec; the new DESIGN.md has no distribution section, so the registry distribution below stays unchanged.
- Flat default is a default-look change ⇒ minor while 0.x. Ghost/link/Tabs-line never take depth.
- Menubar bar `rounded-[10px] p-[3px]`, triggers `h-[30px] px-3`. AlertDialog takes `elevation` like Dialog (it is a dialog); Sheet/Drawer/HoverCard/menus are flat only (their popups follow the overlay role).
- Cross-port consistency: DatePicker/DateRangePicker forward `elevation` to trigger + Calendar shell; choice card checked = `border-ring` + 1px ring in all ports; Message avatar is top-aligned (spec) not stock bottom-aligned; questionnaire shortcut key left of label, check indicator right (board); checkbox/radio indicators in menus sit in the left 16px slot (board, menubar).
- Recipe classes are inlined per component; Base UI selectors are bracket attributes so components do not depend on `shadcn/tailwind.css`.
- Inset panel is its own `registry:ui` item (`inset-panel`), not a Card variant. Badge has ✦ `shape` (default|pill|number). Toggle-group ✦ `variant="segmented"`; accordion ✦ `variant=card`; carousel ✦ `CarouselDots`.
- Icons: default **Phosphor**, switchable. (Supersedes DESIGN.md v1's lucide.) React/Svelte via IconPlaceholder, Vue via init `--icon-library phosphor`.

- Spec v2.1 (delta `refs/edmi-ui-update-2`, merged into `refs/edmi-ui`, gitignored): theming knobs, `success-*` tokens, gray dark lips (superseded by v4 ladder B and the bevel), outline raised gradient, kit boards renumbered (Themes = 02, Patterns = 12). Why: user replaced the spec again; REVISIONS.md is the changelog.
- Positive semantics use `success`, not `brand` (table `trend=up`, index-row/sparkline, ticker-strip, watchlist-item, stat-tile delta badge, task-list completed, Sonner success, attachment done tick, data-table deltas). Kept on `brand` (theme accent): brand button/badge/alert, agent-card Autopilot badge, faceted-filter count, slider, progress brand, switch, avatar badge, bubble tinted/active reaction, code-block highlight, sidebar menu badge, avatar gradients.
- Alert `info` already existed; v2.1 added `success` to Badge and Alert. (The v2.1 lip-colour decisions for `shadow-btn-outline` and `border-b-lip` are superseded: v4 has no lips.)

Registry and tooling
- Generator split: pure logic `scripts/lib/registry.ts` (tested) + CLI; manifest overlays `<group>.vue.ts`/`.svelte.ts` so ports never conflict; per-fw `skip`; `aggregate: "ui"` for `all`/`edmi`; `optionalRegistryDependencies`.
- `theme` carries the whole `@theme inline` map in `cssVars.theme`, plus base-layer `border-color`/`body` rules and the `[data-elevation=raised], [data-elevation=floating]` background-origin rule; font items set `selector` (`html`, `code, kbd, samp, pre`) or mono wins; font deps are `@fontsource-variable/*`.
- React `edmi` base needs `extends: "none"`, `config.style: "base-nova"` (a custom style name 404s), `config.registries`; verified by `smoke/react.sh`. Smoke builds its own registry with a local `EDMI_URL` because URLs are baked in at gen time.
- Verified: `shadcn init` needs `--preset nova` to be non-interactive (`--template vite --base base --preset nova --css-variables --name react --no-monorepo --pointer --yes`). Remove the nested git repo and the eslint/prettier it adds (Biome owns lint/format).
- IconPlaceholder works for third-party registries: the CLI transforms every added file, strips imports whose path contains `icon-placeholder`, leaves elements missing the consumer's library prop broken (so all five props), and does not install the icon package on add (only `init` does).
- Biome covers ts/tsx/js/mjs/json/jsonc/css only (not `.vue/.svelte/.astro`); tokens verbatim copies, installed example files, `refs` and generated output are ignored; `noDocumentCookie` is off (cookies are intentionally plain `document.cookie`).
- Docs: `@edmi-<fw>` alias scheme and `resolve.dedupe` (7.4); docs tsconfig narrowed to `src/plugins/astro.config`; `edmi-resolve` retries `x.js` as `x.ts`.
- Port specifics: Vue accordion keeps Reka `type="single|multiple"`+`collapsible`; Vue resizable uses Reka Splitter (`direction`, numeric percent); React resizable demos use percent strings (react-resizable-panels v4 treats numbers as px) and `min-h-*` not `h-[…]`. `direction` is a `DirectionProvider` wrapper in Vue and a small context provider in Svelte. `aspect-ratio` is a plain div with `--ratio` everywhere; Progress label/value use an own context. Calendar uses Reka/Bits Calendar + `@internationalized/date` (no date-fns), `RangeCalendar` separate in Vue/Svelte, month/year selector is a native select; date-picker is a `registry:ui` dir with DatePicker + DateRangePicker (✦ presets). Drawer: Base UI Drawer (React), Reka Drawer (Vue), vaul-svelte (Svelte). Sonner re-exports `toast`; Vue imports `vue-sonner/style.css` itself. `CommandDialog` wraps children in `<Command>`. Vue data-table uses `EyeIcon`/`PanelLeft`. Pattern ReactNode props ⇒ Vue slots / Svelte snippets; callbacks ⇒ emits / `on*`.
- Svelte `use-mobile` ships as `src/lib/registry/hooks/is-mobile.svelte.ts`; Svelte command input is a plain input row (like React).
- `vue-tsc` wrapper (6); Svelte aliases `#lib/*` for the init flow (new SvelteKit has no `$lib` default).
- Examples: Vue scaffold `shadcn-vue init --base reka --style nova --icon-library phosphor --font inter`, `vue-tsc` via the repo wrapper; Svelte reads theme/layout cookies in SSR (`hooks.server.ts`, `%edmi.theme%` in `app.html`) and sets `iconLibrary: phosphor` by hand. Google Fonts are linked from `index.html` (an `@import` after Tailwind is ignored).
- Release: zero secrets; see 9 for the pending `setup-node` exception.

Theming (registry and docs)
- Themes ship two ways: the CSS route (attributes `data-base`/`data-theme`, `tokens.css` → `base/*` → `themes/*`) for runtime switching, and `registry:theme` items per base × accent that replace `:root`/`.dark` colors (shadcn-style). The default `theme` item stays Stone · Green. Why: user decision (shadcn-style customizer; Ocean/Slate are examples of how to customize).
- Theme items omit `radius` and have no `registryDependencies`. Why: installing a theme must not reset the app's radius or pull the whole base theme again.
- Docs customizer persists only in `localStorage["edmi-themes"]`, preview is scoped to a wrapper. Why: the docs chrome theme is independent.

Spec v3 and AI pack
- Spec v3 adopted (white light card, solid soft tints, rules 16–17, code block body `--card`/header `--muted`). `packages/tokens/src/ai.css` is a verbatim copy of `css/ai.css` (exported `./ai.css`, biome-ignored like `kit.css`). Why: user replaced the spec; tokens/recipes stay verbatim copies. Tint recipes are copied from `recipes.ts` (`color-mix(in_srgb,…,var(--popover))`); `stroke-border/50` chart gridlines and the inset-panel `from-transparent` fade stay (decorative, not surfaces).
- Spec v3 AI sections (7b) supersede the earlier plan notes: the file layout and provenance are as listed below.

AI pack (v3, decided with the user)
- Items are `ai-<name>` in the `@edmi-ui` namespace plus the `ai-all` aggregate (not a separate `@edmi/ai` namespace: shadcn namespaces are per registry; one registry, prefixed names, folder `components/ai/`). Why: user decision; DESIGN §5b's `@edmi/ai` becomes `@edmi-ui/ai-*`.
- ALL AI Elements components ship in all three frameworks where at all possible (persona/Rive, workflow canvas via xyflow, audio player included); only a truly impossible item may `skip`, with the reason documented. `scripts/ai-pending.json` (temporary allowlist for ports in progress) is now empty: all 56 items ship in all three ports; keep it empty (the stale-entry check stays).
- Licenses: Vercel AI Elements is Apache-2.0, **AI Elements Vue is Apache-2.0 (© cwandev), not MIT**, Svelte AI Elements is MIT (© Sikandar Bhide). NOTICE + `licenses/` carry the texts. Per-file `Derived from …` header comments were removed (user decision); NOTICE lists the derived items and states they were modified.
- Item type `registry:component` (not `registry:ui`) so AI items install to `components/ai/` and never into `components/ui/`; the `ui` aggregate also filters by category, so `all` stays AI-free.
- React Radix `useControllableState` is replaced by a local hook shipped as `ai-use-controllable-state` (`registry:hook`, `hooks/ai/`); Vue uses `useVModel`, Svelte `$bindable` (items `skip` there).
- Conversation is a thin layer on `ui/message-scroller` (no `use-stick-to-bottom`); Message = `ui/message` + `ui/bubble`: assistant `MessageContent` is a ghost bubble (status text aligns), user is a secondary bubble, avatar + header opt-in via a grid in `Message`.
- Markdown: React `streamdown`, Vue `vue-stream-markdown`, Svelte `svelte-streamdown` (MIT, actively maintained; chosen over `streamdown-svelte`, which pulls the whole remark/rehype tree and ships its own shiki 3). Rive: `@rive-app/webgl2` directly in Vue and Svelte (no maintained Svelte wrapper exists). Terminal ANSI: `ansi-to-react` / `ansi-to-vue3` / `anser`.
- `ai` (Vercel AI SDK) is v7: stock sources written for v5/v6 type fields need adapting (see 7b).
- AI wave decisions (all three ports shipped):
  - Vue icons: only names that exist in the shadcn-vue icon map (checked by `scripts/smoke/vue-icons.ts`, run by `vue.sh`); substitute rather than add a custom icon (`TerminalSquareIcon` -> `Terminal`, `ExternalLinkIcon` -> `ArrowUpRightIcon`). The Vue/Svelte docs demos follow the same rule.
  - Svelte: a child that registers itself with its parent from `$effect` must wrap reads/writes of parent state in `untrack` (otherwise effect loops); optional boolean props need an explicit default in `$props()` (`elevation = "auto"`, `open = false`), never rely on `undefined`.
  - jsx-preview: Vue and Svelte use a small sandboxed JSX parser (no `eval`/`new Function`, no `react-jsx-parser`), only a safe subset of tags/props; React keeps `react-jsx-parser`.
  - Code highlighting: Shiki with a `css-variables` theme whose variables are mapped to the chart tokens (`--chart-1..5`, `--foreground`, `--muted-foreground`), so code recolours with the theme; the terminal (ANSI) is always dark in every mode (oklch literals from `ai.css`).
  - Persona: Rive artwork is loaded from the network and its colors cannot follow Edmi tokens (Rive limitation); variants are listed in the docs page.
  - Voice selector: voice metadata (gender, accent, age) is rendered as plain text meta (no icons/flags); mic selector: built on the cmdk `Command` list, so device search/selection follow cmdk behaviour (the item value is the device id, filtering is by label).
  - Workflow: `Toolbar` (node toolbar) defaults to `Position.Top`; `open-in-chat` provider marks use literal brand hex colors (the only allowed hex: third-party brand logos); `audio-player` is built on `media-chrome` (React `media-chrome/react`, Vue/Svelte via the custom elements); transcription does not use it.
  - Vue docs alias `@edmi-vue/components` maps to `packages/vue/registry/components` (demos import `@edmi-vue/components/ai/<name>`).
  - Previews: Vue and Svelte previews load groups lazily and accept `?group=<name>` (`?group=a,b` in Vue; Svelte route `/preview?group=`); both add Tailwind `@source` for `apps/docs/src/demos/<fw>`, so never add hidden "class list" spans to make demo utilities exist.
- Docs `.edmi-preview` default `border-color` moved into `@layer components` so utilities (`border-transparent`, `border-sk-bd`) win in previews (it was unlayered and overrode them; visible as a frame around ghost bubbles).

Docs examples
- Examples render in an **iframe to a bare route** (real viewport for Sidebar/media queries, own `<html>` so portals follow the knobs), not a scoped container. Knobs travel by query + `postMessage`; framework switch swaps the route. Why: robustness; EXAMPLES.md allowed either.
- Every example is live in all three frameworks (user decision), shares one `data.ts`, and imports registry aliases only.

Docs-site and QA wave fixes (still binding)
- Starlight's fixed `.right-sidebar` spans the full width above z-50 portals and swallowed clicks on the right half of toasts/popovers: it is `pointer-events: none` with `auto` restored on its TOC children (`global.css`).
- cmdk scrolls its initial item into view on mount and moved the page: `astro.config.mjs` ignores `scrollIntoView` inside `[cmdk-root]` until the visitor interacts. A second head script re-scrolls to the URL hash once after demos hydrate (only before interaction; heading ids carry a trailing `-` for `Raised ✦`, so `#raised` falls back to `[id^=raised-]`).
- Redirects in `astro.config.mjs` keep the `/edmi-ui` base (target and source).
- Page subtitles and components-index cards render backticks in descriptions as `<code>`; the meta description stays plain text. Component source shown in docs is passed through `consumerSource` (`lib/demo.ts`): the dev-only `IconPlaceholder` becomes the Phosphor import/element a consumer gets. Components-index thumbnails strip `href`s (inert, no base-less links). Preview stages with a navigation menu get extra height/top alignment so the viewport panel is not clipped.
- Vue `MessageResponse` `mode` prop defaults to static; Vue menu checkbox/radio items keep the menu open via `closeOnSelect`; the faceted filter uses `arrHas` for array columns.

Agent skill
- The consumer skill lives in `skills/edmi-ui` (the path the `skills` CLI discovers), not under `.claude/`, so every agent product can install it; catalog and elevation list are generated, the guidance is hand-written (7.7). Docs pages: Agent skills and Upgrading under Getting Started. Why: user decision; consumers should get correct installs, themes and elevation restraint from their own coding agent.
- Upgrading guidance: components are copied by the shadcn CLIs, so upgrade = changelog, optional preview (`add --dry-run`/`--diff` exist in the React CLI only), `add ... --overwrite`, review `git diff`; pinned jsDelivr URLs change version.

Superseded and intentionally dropped: lucide as default icon set; raised-by-default look and `h-[38px]` controls (v1 spec); the boolean `raised` prop and hard lips (v4); plan-era parallel-worker ownership rules and `plans/requests`; `registry:font` for Vue/Svelte; the "utils item for all ports" idea; `data-raised` as a styling hook (the base rule stays harmless).

## 11. Known gotchas

- **bunx quirks:** shadcn-svelte and `sv` need `bunx --bun` (plain bunx fails to download add-ons and `init` has no `--yes`; smoke feeds Enter on stdin). `shadcn view/add` for some React items (accordion, collapsible, resizable, direction) need `bunx --bun`. `bunx changeset init` needs `bunx --bun` plus Enter on stdin.
- **Interactive prompts hang at 100% CPU** under the node shim. Always pass `</dev/null` or `yes`/flags, never leave a CLI waiting, and **kill stray CLI/dev-server processes** you start (`ps`, `lsof -i :<port>`). Concurrent `bunx` runs can corrupt the shared temp cache: do not run several shadcn CLIs at once.
- shadcn-vue 2.8.x has no `--dry-run`/`--view`, and `init <url>/edmi.json` does not work (ignores item `config`, mangles `registry:lib` paths). Supported flow: init, `registries.@edmi-ui`, `add @edmi-ui/theme @edmi-ui/all --overwrite`.
- shadcn-svelte registry items are strict; `registry:block` installs flat; duplicate `IconPlaceholder` imports break calendar/data-table (import once per file). Its `--preset` accepts codes only.
- React `shadcn add` rewrites only `@/registry/<style>/…` imports; it also writes the stock deps of an item. It may touch `package.json`: revert.
- Font items use `@fontsource-variable/*`; Vue/Svelte get Google Fonts `@import url(...)` inside theme `css`.
- Astro dev `ReferenceError: $RefreshSig$ is not defined` (stack in a `.vue` file) is fixed, not a quirk: @vitejs/plugin-react turns `oxc.jsx.refresh` on globally and @vitejs/plugin-vue spreads that global `config.oxc` into its own `transformWithOxc` call for every TS SFC, so `react({ include })` alone cannot stop it. `apps/docs/plugins/vue-no-react-refresh.mjs` switches the flag off after `vite:oxc` captured it; `react()` keeps an `include` list limited to React paths. A config edit does not hot-reload `astro.config.mjs` content: restart `astro dev` (a second instance needs `--ignore-lock`). A brand-new demo file also needs an `astro dev` restart (islands generated at config load). Components using `client:visible` and portalled content in previews render outside the `.dark` wrapper (preview limitation, not a registry bug). Starlight `<Tabs>` break prerender.
- The built-in browser only delivers real clicks to a fronted tab; low-resolution screenshots hide 1px issues, so audit computed styles.
- The Vue data-table dropdown triggers could not be reproduced as not opening on click; `cmdk` parts crash without `<Command>` (fixed in `CommandDialog`).
- A changeset that names only private/ignored packages (`@edmi-ui/react|vue|svelte|docs|example-*`) is never consumed: release.yml then reopens "Version Packages" forever and never publishes. Name `@edmi-ui/tokens` or `@edmi-ui/registry-<fw>`. Guarded by `scripts/changesets.test.ts`.
- Radix/Reka/Bits `data-[state=…]` and Base UI attributes differ: copying class strings between React and the others without the swap silently breaks states. `peer-checked` cannot reach nested spans: use `group-has-[:checked]/name`.
- Svelte/Vue `typecheck` runs through wrappers; if it fails after a CLI added files, check for untracked stock deps first.
- This is a shared working tree in multi-agent sessions: never `git stash`, `reset --hard`, `checkout .`, `clean`, `rebase`; stage explicit paths only.

## 12. Guidance for AI agents (and humans acting like one)

How to approach a task
1. Read this file, then `refs/edmi-ui/DESIGN.md` §4 (and §5 for the component you touch). Look at the relevant board PNGs. Skim existing neighbours in the same group in all three ports before writing; copy their conventions.
2. Plan the three-port impact first: React, Vue, Svelte, manifest (3 files), demos (+ `-elevation`), mdx, changeset, verify-matrix lists.
3. Use official CLIs and **open the tool's current docs for the command and flags**; do not run from memory. Prefer non-interactive flags with `</dev/null`.
4. Keep the ports in sync; the same recipe strings, differing only by primitive selectors and framework idioms.
5. Never hand-edit generated files (`registry.json`, `apps/docs/public/r/**`, `islands/**`, `packages/registry-*/r`). Do not edit `package.json`/`bun.lock`/`components.json`/`tsconfig*`/`.github/**` unless the task is about them; if a CLI touched them by accident, revert.
6. Do not "improve" §4 rules, invent tokens/variants or change any component design without a handoff document in `refs/*` (section 5). Additions are ✦, additive, and listed in the docs mdx.
7. Run the gates in 8 before saying you are done; run the smoke script of every port you changed. Report honestly: what you ran, exit codes, what you did not verify (hover/focus/pressed states, dark portals, StackBlitz). Do not claim checks you skipped.
8. Clean up: kill dev servers/preview processes and CLIs you started, remove temp dirs, do not leave untracked stock deps behind.
9. Scope: stay inside the repo and OS temp dirs; do not install global tools or Node. Ask the user before outward-facing or irreversible actions: publishing to npm, pushing, creating releases, editing GitHub settings, force operations, deleting data.
10. Commits: only when asked; stage explicit paths (never `git add -A`/`.`); conventional messages (`feat(react/forms-text): select`, `fix(vue/v2-qa): …`, `docs: …`); one component per commit; add a changeset for user-visible changes. **Never add `Co-Authored-By:` trailers or "Generated with …" lines** to commits or PRs; the author is the human committing (maintainer: `viandwi24 <viandwi24@pm.me>`).
11. Record any new decision (and the why) in section 10 and keep this file current when conventions change.

Task prompt template (paste to an agent):
```text
Work in the Edmi UI repo. First read AGENTS.md and refs/edmi-ui/DESIGN.md §4 (+ §5 for <component>).
Task: <what to build or fix>, in all three ports (React/Vue/Svelte), flat by default with `elevation` if the spec lists it.
Steps: get stock sources via the official CLIs (copy commands from current docs, non-interactive, `</dev/null`; bunx --bun for shadcn-svelte/sv),
restyle with packages/tokens/src/recipes.ts, update registry.manifest/<group>{,.vue,.svelte}.ts, add demos (+ -elevation) and the mdx page,
add a changeset. Do not hand-edit generated files or package.json/bun.lock.
Verify: bun run gen:strict, typecheck, lint, test, build:registry + verify:matrix, docs build, the relevant scripts/smoke/*.sh, and compare
against refs/edmi-ui/screens/edmi-ui-kit/<board>-{light,dark}.png in light/dark, flat/layered and each elevation level.
Clean up any processes you start. Report exactly what you ran and what you could not verify. Do not commit or publish unless I ask.
```

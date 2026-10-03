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

- Same item names and anatomy/props as shadcn, so `add @edmi/<name> --overwrite` is a drop-in restyle. ✦ marks Edmi additions (additive only; never remove a stock prop or variant).
- **Flat by default.** Every component renders the plain shadcn look. The 3D look is the opt-in `raised` ✦ prop (one face plus one hard lip).
- Default icons: **Phosphor**, switchable through the consumer's `iconLibrary` (see 6).
- **Bun is the only package manager and runtime.** No npm/pnpm/yarn, no Node install. Run CLIs with `bunx` (bun provides a `node` shim); `bunx npm …` only for publish/pack. Do not use the `gh` CLI.
- Docs and live demos: <https://viandwi24.github.io/edmi-ui/> (GitHub owner `viandwi24`, base `/edmi-ui`). Long-term domain `https://ui.edmi.dev` (the `EDMI_URL` default of the generator).

## 2. Commands

```bash
bun install                 # only when a task requires dependency changes
bun run gen                 # generate packages/<fw>/registry.json from registry.manifest/ (warns on missing files)
bun run gen:strict          # same, but missing files / unresolved deps are errors (CI uses this)
bun run build:registry      # run each package's registry build -> apps/docs/public/r/<fw>/*.json
bun run pack:registries     # build npm-publishable registries into packages/registry-<fw>/r (EDMI_URL = jsDelivr path)
bun run release             # CI publish step (release.yml publish-script): gen:strict, build:registry, pack:registries, changeset publish
bun run verify:matrix       # item x framework matrix (manifest + built JSON + docs page + demo + <name>-raised demos); exit 1 on gaps; --markdown prints the README table
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
`bash scripts/smoke/all.sh` (all) or `react.sh | vue.sh | svelte.sh | example-react.sh | example-vue.sh | example-svelte.sh`. `scripts/smoke/vue-icons.ts` (run by `vue.sh`) validates Vue icon names (see 6).

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
scripts/                  gen-registry.ts (+ lib/registry.ts, tested), build-registry.ts, pack-registries.ts, verify-matrix.ts, smoke/*
apps/docs                 Astro + Starlight site: src/demos/<fw>/<name>[-raised].*, src/content/docs/components/<group>/<name>.mdx, plugins/, templates/component.mdx
examples/react|vue|svelte Stockbreak Markets app per framework + examples/install.sh
.changeset/               changesets (fixed version group)
refs/edmi-ui              BINDING design spec v2 (DESIGN.md, tokens, recipes, kit.css, reference boards, screens/)
refs/stockbreak-design    spec v1, history only; do not follow
```

Generated, gitignored, never hand-edited: every `registry.json`, `apps/docs/public/r/**`, `apps/docs/src/components/islands/**`, `packages/registry-*/r`.

## 4. How the registry works

1. Items are declared once in `registry.manifest/<group>.ts` (`name`, `title`, `description`, `type`, `categories`, `registryDependencies` as **Edmi names only**, `docs`, `frameworks.react`). Vue/Svelte file lists live in the `<group>.vue.ts` / `<group>.svelte.ts` overlays (separate files so ports never edit the same file). Per-framework `skip: true` omits an item (the only one today: `use-mobile` for Vue); depending on a skipped item is an error.
2. `bun run gen` (`scripts/gen-registry.ts`, logic in `scripts/lib/registry.ts`) writes `packages/<fw>/registry.json`: deterministic, sorted, with `homepage = EDMI_URL`. It rewrites `registryDependencies`: React/Vue → `@edmi/<name>`, Svelte → `${EDMI_URL}/r/svelte/<name>.json` (shadcn-svelte has no namespaces). `--strict`/`CI=true` fails on missing files; `--out <dir>` writes all three elsewhere (smoke tests).
3. The port's own CLI builds JSON: `shadcn build` (React), `shadcn-vue build`, `bunx --bun shadcn-svelte registry build`, into `apps/docs/public/r/<fw>/`. Pages serves them at `https://viandwi24.github.io/edmi-ui/r/<fw>/{name}.json` (CORS open).
4. Entry items (`registry.manifest/meta.ts`): `theme` (registry:theme, cssVars from `@edmi-ui/tokens`, `[data-raised]` base rule, border/body base layer), `all` (aggregate of every `registry:ui` item for that framework), `edmi` (React `registry:base` with `extends: "none"`, `config.style: "base-nova"`, `config.iconLibrary: phosphor`, `config.registries["@edmi"]` injected from `EDMI_URL`; Vue → `registry:block`; Svelte → `registry:style`), `font-instrument-sans|jetbrains-mono|sora` (React `registry:font`, `@fontsource-variable/*`; Vue/Svelte get the Google Fonts `@import` inside theme `css`).
5. Install flows: React `init <url>/edmi.json` (new) or `registry add "@edmi=<url>/r/react/{name}.json"` + `add @edmi/theme @edmi/all --overwrite`; Vue `registries.@edmi` in `components.json` + `add @edmi/theme @edmi/all --overwrite` (init-from-URL is unsupported, see 11); Svelte URL-only `add <url>/theme.json <url>/all.json --overwrite`.
6. `registryDependencies` rules: Edmi names only, never stock shadcn items; every dependency must exist in the manifest; a dependency may not be skipped for that framework.
7. Distribution: Pages = docs + latest registries (`EDMI_URL` = Pages URL). npm = `@edmi-ui/tokens` and `@edmi-ui/registry-{react,vue,svelte}`; `pack:registries` regenerates with `EDMI_URL=https://cdn.jsdelivr.net/npm/@edmi-ui/registry-svelte@<major>` so Svelte URL deps pin the same major. Consumers: `https://cdn.jsdelivr.net/npm/@edmi-ui/registry-<fw>@0/r/<name>.json`. `@edmi-ui/{react,vue,svelte}` source packages are `"private": true`.
8. Schema notes: Svelte registry items are strict (no `docs`/`categories`/`config`; generator moves them into `meta`). `config` is honoured only on React `registry:base`. Every emitted item has `files` + `registryDependencies` (possibly empty).

## 5. Design rules and `raised`

Binding spec: `refs/edmi-ui/DESIGN.md` (§1 stack, §4 rules, §5 components). **Read §4 before touching any component.** Classes come from `packages/tokens/src/recipes.ts` (inline the strings into each component; registry files cannot import `@edmi-ui/tokens`). Compare with the boards in `refs/edmi-ui/screens/edmi-ui-kit/<NN-board>-{light,dark}.png` (each board has a "Raised ✦" row) and `refs/edmi-ui/reference/*.dc.html` for exact values. Do not "improve" §4.

Rules in short (§4):
1. Flat by default; `raised` opt-in. `ghost`, `link` buttons and Tabs `line` are never raised.
2. No blurred shadows. Raised depth = hard lips `0 2px 0 var(--lip)` (card/controls), `0 4px 0 var(--lip-strong)` (dialog/popover); only inset shadows may be soft (1–2px).
3. One step only: face + ONE lip. Bottom border and hard shadow use the same lip colour; never an inner bottom shade (`inset 0 -2px`). Raised filled controls = vertical gradient `-hi → base` + `inset 0 1px 0` highlight + the lip, with `[background-origin:border-box]`.
4. Dark primary = white with a gray lip and transparent side border; selected states with a ring drop the lip.
5. Pressed: raised = `translateY(2px)` + lip 0; flat = slightly darker fill.
6. Tabs/segmented: flat active = `--tab-active` fill + 1px border; raised = 3D secondary button.
7. Floating chips over another surface are solid (`--popover`) with a 1px border; no transparency or outer ring.
8. Inset panel: header on `--muted` shell; body `--card` edge to edge with top radius only; footer back on shell.
9. Message rows: avatar top-aligned with the sender line. 10. One height per group. 11. Numbers are mono, right-aligned in tables; up = `--brand-text`, down = `--destructive-text`. 12. Marketing headings soft ink, weight 400–500. 13. Brand badges/alerts/toasts = soft fill + tinted 30–40% border.

Tokens/type: OKLCH tokens in `:root` (light) and `.dark`; theme and layout stored in a cookie (plain `document.cookie`, SSR-readable). Radius from `--radius: 0.625rem`. **Control height `h-9` (36px)**, `sm` 32px, `lg` 42px (Button, Input, Input Group, Select, Toggle; Textarea min-h-24). Inputs inside a ButtonGroup: `rounded-r-none shadow-none`. Fonts: Instrument Sans (UI), JetBrains Mono (every number), Sora 600 (wordmarks only).

### `raised` mechanics (same prop name in all ports, default `false`)
- cva/tv components: boolean variant `raised: { false: "", true: "…" }` + `compoundVariants` copied verbatim from `recipes.ts`. Vue passes real booleans (`buttonVariants({ variant, size, raised })`); Svelte `raised = false` in `$props()`.
- Plain components: `raised && "…"` inside `cn(...)`.
- **Containers pass it down** so children can still override (`child.raised ?? ctx.raised`): React `React.createContext` in the same file; Vue `provide`/`inject` with a getter object; Svelte `setContext`/`getContext` with a getter object. Vue children that inherit use `withDefaults(..., { raised: undefined })` (a `false` default would block the fallback); never forward `raised` to a Reka primitive (`reactiveOmit`) or it lands in the DOM.
- Patterns never hard-code lips/shadows: they accept `raised` and forward it to the Card/Button they render.
- Selector swap: recipes use Radix/Reka/Bits `data-[state=…]`. Vue and Svelte keep it verbatim. React (Base UI) swaps `data-[state=active]`→`data-[active]`, `on`→`data-[pressed]`, `checked`→`data-[checked]`, open popup→`data-[open]`, open trigger→`data-[popup-open]` (use bracket attributes, not shadcn's custom variants like `data-active:`).

| Raised ✦ lives on | Where it applies |
|---|---|
| Button (default, secondary, outline, destructive, brand) | variant compounds; active adds `translate-y-[2px]` |
| Toggle, ToggleGroup | group passes to items; `segmented` track items use `itemRaised` |
| Tabs (`TabsList variant="default\|line\|pills"` + `raised`) | list passes `{variant, raised}` to triggers; `line` ignores raised |
| Kbd | on `Kbd`, not `KbdGroup` |
| Select trigger, Native Select | trigger only (popup stays flat) |
| Checkbox, Switch (thumb), Slider (thumbs), Calendar/RangeCalendar (selected day) | on the root, applied to the part |
| Choice card (FieldLabel card, radio/checkbox card, Questionnaire options, layout-picker) | `raised` on Questionnaire applies to every option |
| Card, InsetPanel (body highlight via context/data attr), EmptyMedia | |
| Popover, Dialog, AlertDialog | on the Content part |
| Toast (Sonner) | `<Toaster raised />` adds classes to `toastOptions.classNames.toast` |
| Menubar | bar only (`border-b-lip shadow-btn-outline`, derived from board 07) |
| Pagination | active link; context from `Pagination` |
| BubbleReactions | chips (`active` kept) |
| DatePicker/DateRangePicker | forward to trigger Button + Calendar |
| ✦ Patterns | forward to their Card/Button |

Flat-only (do not add raised): Alert, Sheet, Drawer, HoverCard, Tooltip, menus/Command/NavigationMenu popups, Sidebar, Accordion, Table/DataTable (container flat; toolbar follows Button/Input), Chart, Bubble, Combobox, Input-ish controls, Attachment. Every component with `raised` needs a `<name>-raised` demo in all three ports (checked by `verify:matrix`).

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
- Props: `withDefaults(defineProps<…>(), { raised: false })` for components that own the look; `{ x: undefined }` for anything inheriting from `inject` or a cookie (`defaultOpen`, `defaultChecked`, `pressed`). Selectors `data-[state=…]` brackets (Reka puts `data-state=open` on triggers too), not shadcn-vue's custom variants. Polymorphic: `as-child`.
- `vue-tsc` is broken under Bun; `packages/vue/scripts/vue-tsc.mjs` patches a copy of tsc (used by `typecheck` and smoke). Never call plain `vue-tsc`.
- Scaffold flags that work: `shadcn-vue init --template vite --base reka --preset nova --css-variables --yes --no-reinstall`.

**Svelte** (`packages/svelte`, Bits UI)
- Physical `src/lib/registry/{ui,lib,hooks}/<name>/`; sources import `$lib/utils.js` and `$lib/registry/ui/<x>/index.js` (the CLI turns them into `$UTILS$`/`$UI$` at build and the consumer's aliases at install). No `utils` item (consumer's init provides `$lib/utils`). Docs alias `$lib` → `packages/svelte/src/lib`, `@edmi-svelte/ui/*` → `…/registry/ui/*`.
- Variants with `tv()` (never cva). Selectors `data-[state=open|checked|on|active]`, `data-[orientation=…]`, `data-[highlighted]`; polymorphic via the Bits `child` snippet; links as buttons: `buttonVariants()` on `<a>` or `<Button href>`. ReactNode props map to Snippets; callbacks to `on*` props; two-way via `$bindable`.
- Icons: `<IconPlaceholder lucide tabler hugeicons phosphor remixicon />` (dev-only shim `src/lib/components/icon-placeholder/`), same mechanism as React. **Import it once per file** (the CLI's rewrite otherwise emits duplicate icon imports). `packages/svelte/components.json` sets `iconLibrary: phosphor`.
- Omit manifest `dependencies` for Svelte: `registry build` infers them with versions. Pattern items install flat (`registry:block`).
- The conversation group has no shadcn-svelte stock: built from recipes on Bits UI (engines ported to Svelte 5 runes, `use-*.svelte.ts`, live values via `.current`). Context for `raised` uses getter objects so it stays reactive.
- Scaffold flags that work: `sv create svelte --template minimal --types ts --no-add-ons --no-install`, `sv add tailwindcss=plugins:none`, `shadcn-svelte init --preset b2fA` (code of "nova"; names are rejected) with aliases `#lib/*`, `sv add @shadcn-svelte/registry=demo:no`. All via `bunx --bun`.

## 7. Playbook

### 7.1 Add a new component or pattern (do all three ports)
1. Read DESIGN.md §4/§5 and the matching board (light + dark, flat + raised). Check the stock docs page of each port.
2. Get the stock source with the **official CLI**, never from memory. React: `bunx shadcn@latest add <name> --dry-run`, then `yes n | bunx shadcn@latest add <name>` (writes to `registry/ui/`). Vue (no `--dry-run`): `bunx shadcn-vue@latest add <name> -y </dev/null` only if you own every file it writes, else fetch `https://www.shadcn-vue.com/r/styles/new-york-v4/<name>.json`. Svelte: `bunx --bun shadcn-svelte@latest add <name> --no-deps-install --overwrite -y </dev/null` (or `https://shadcn-svelte.com/registry/styles/nova/<name>.json`). Afterwards `git status`: delete untracked stock deps you do not own, `git checkout --` tracked files you did not mean to change, revert `package.json`/`bun.lock`/`components.json` if the CLI touched them. If the CLI crashes (shared bunx cache corruption), take the stock source from the registry JSON the CLI reads (`https://ui.shadcn.com/r/styles/base-nova/<name>.json`). No stock counterpart (✦, patterns, conversation): build from `recipes.ts` + `kit.css` + the reference boards.
3. Restyle React first: keep anatomy/props/`data-slot`/exports; inline recipe classes; Base UI selectors; ✦ variants additive; add `raised` per 5 if the spec lists the component; icons via IconPlaceholder; control height `h-9`.
4. Port to Vue and Svelte with the same recipe strings and each port's conventions (6).
5. Manifest: item in `registry.manifest/<group>.ts` (+ React files), Vue file list in `<group>.vue.ts`, Svelte in `<group>.svelte.ts`:
   ```ts
   { name: "x", title: "X", description: "…", type: "registry:ui", categories: ["Display"],
     registryDependencies: ["button"],           // Edmi names only
     docs: "Replaces the stock x: `shadcn add @edmi/x --overwrite`.",
     frameworks: { react: { files: [{ path: "registry/ui/x.tsx" }], dependencies: ["@base-ui/react", "class-variance-authority", "cn"] } } }
   // x.vue.ts:     x: { files: [{ path: "registry/ui/x/X.vue" }, { path: "registry/ui/x/index.ts" }], dependencies: ["reka-ui", "class-variance-authority"] }
   // x.svelte.ts:  x: { files: [{ path: "src/lib/registry/ui/x/x.svelte" }, { path: "src/lib/registry/ui/x/index.ts" }], registryDependencies: ["button"] }
   ```
   Per-framework `type`, `registryDependencies`, `cssVars`, `css`, `config`, `skip` overrides are allowed. A new group/file must be merged in `registry.manifest/index.ts`. Add the item name to `REQUIRED` in `scripts/verify-matrix.ts` (and to its raised list if applicable).
6. Docs: demos `apps/docs/src/demos/{react/x.tsx,vue/x.vue,svelte/x.svelte}` (+ `x-raised.*` for raised components), page `apps/docs/src/content/docs/components/<group>/x.mdx` from `apps/docs/templates/component.mdx`. **Quote the frontmatter description** (an unquoted colon breaks the YAML). Sections: `<ComponentDemo name="x" />`, API table (include `raised | boolean | false`), `## Raised ✦` with `<ComponentDemo name="x" demo="x-raised" />`, `## ✦ Edmi additions`. Demos must import registry code via `@edmi-react/ui/x`, `@edmi-vue/ui/x`, `@edmi-svelte/ui/x`; avoid importing icon or third-party packages the docs app does not depend on. Restart `astro dev` after adding a brand-new demo file (islands are generated at config load).
7. Preview page: add the demo to `packages/<fw>/src/preview/<group>.*` and compare against the board.
8. `bunx changeset` (see 9). Run the gates (8). Commit one component per commit, `feat(<fw or all>/<group>): <name>`.

### 7.2 Modify an existing component
Change React, then mirror the identical change in Vue and Svelte (diff class strings after normalising selectors). Update demos/mdx if the API changed. Never leave the ports out of sync; if a port truly cannot, say so in the PR and a decision line (10). Changeset: patch for style fixes, minor for new props/variants, major for removals.

### 7.3 Change tokens or recipes
`packages/tokens/src/{tokens.css,theme.css,tokens.json,recipes.ts,kit.css}` mirror `refs/edmi-ui`; keep them verbatim (excluded from Biome). Spec changes originate in `refs/edmi-ui`; copy, then update every component that inlines the changed strings (grep the old class). Renamed/removed token or default-look break ⇒ major (minor while 0.x). Re-run all gates and visual QA.

### 7.4 Docs site (`apps/docs`)
- Astro 7 + Starlight, Tailwind v4 (`@tailwindcss/vite`). `ComponentDemo.astro` (`name`, optional `demo`) reads the manifest, shows React/Vue/Svelte via a framework select (synced through `localStorage["edmi-framework"]` and the `edmi-framework` window event), Preview/Code tabs, usage (`?raw` demo source), component source and install command. Tabs for `skip`ped frameworks hide automatically. Sidebar is generated from manifest groups.
- Demo islands: Astro only hydrates statically imported components, so `plugins/gen-islands.mjs` generates a wrapper per demo file into `src/components/islands/<fw>/` at config load (gitignored).
- Resolution: `plugins/edmi-resolve.mjs` aliases (`@/registry/edmi/*`, `@/*`, `$lib/*` resolve inside the importing package; `@edmi-<fw>/*` anywhere); shared libs (react, vue, svelte, base-ui, reka-ui, bits-ui, sonner variants…) are `resolve.dedupe`d and listed as `apps/docs` dependencies so demo and registry file share one instance. The manifest is loaded natively at runtime (`src/lib/manifest.ts`).
- Theme toggle: Starlight sets `data-theme`; a head script and `ThemeSelect` map it to `.dark` on `<html>`. Preview cards can be forced light with `.edmi-light`. Starlight overrides (Header/Sidebar/PageFrame/Hero/ThemeSelect) give a shadcn-like layout in Edmi tokens; the landing page has a Flat/Raised toggle. Registry previews get a scoped Tailwind-preflight subset in `global.css`. Fonts load via a Google Fonts `<link>` in Starlight `head`.
- Do not use Starlight `<Tabs>`/`<Steps>`/`<FileTree>` (fail at prerender). `@edmi-ui/docs` build goes under base `/edmi-ui/` and builds a Pagefind index.

### 7.5 Examples (`examples/<fw>`)
Stockbreak Markets page + app shell (dashboard and navbar layouts, cookie layout picker, theme toggle). They install Edmi **only through the CLI** via `examples/install.sh <fw>` (default `EDMI_URL=http://localhost:4321/edmi-ui`, i.e. the docs dev server must serve `/r/<fw>`), and **never import `packages/*`**. Example pages "opt into raised" (CTA, ticker strip, cards, header pills, watchlist, layout picker). Biome ignores installed files (`src/components/ui`, installed blocks, `lib/utils.ts`, hooks). After a re-install restore `components.json` registry URLs to the GitHub Pages URL. Smoke: `bash scripts/smoke/example-<fw>.sh`.

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

Visual QA (UI changes): run the port's preview (or `astro preview` for docs) and compare each affected board `refs/edmi-ui/screens/edmi-ui-kit/<NN>-*-{light,dark}.png` in light **and** dark, flat **and** raised. Also run computed-style audits: no non-inset blurred `box-shadow`; every gradient on a bordered raised control has `background-origin: border-box`; lip colour = bottom border colour; no `inset 0 -N` shade; flat demos contain no gradient/lip; control heights 36/32/42; table numbers mono and right-aligned. Grep the registry for leftovers (`h-[38px]`, `shadow-pop|dialog|card|btn-*` outside raised strings). Check real clicks on interactive demos (menus open, toast fires). Pressed/focus/open states and portalled popups in dark are easy to miss; verify or state that you did not. Examples vs `refs/edmi-ui/screens/stockbreak-example/markets-{light,dark}.png`. Not verifiable without a remote: StackBlitz links.

## 9. Versioning and release

- Changesets, **one fixed group**: `@edmi-ui/tokens`, `@edmi-ui/registry-{react,vue,svelte}` always share a version. Private source packages, docs and examples are in the `ignore` list; name `@edmi-ui/tokens` (or a registry package) in your changeset, not them. Add one `.changeset/<name>.md` per change (`bunx changeset`; if it spins at 100% CPU use `bunx --bun changeset`).
- Bump: **patch** styling fix inside a component, docs, a ✦ variant that only adds a value; **minor** new component/token/prop/variant (and the v2 default-look change); **major** token renamed/removed, variant/prop removed, default look change breaking layouts, primitive library change. Pre-1.0 (`0.x`): minor may be breaking.
- Flow and one-time setup (git remote, Pages = GitHub Actions, first local publish of the 4 packages, npm Trusted Publisher per package) are in [RELEASING.md](RELEASING.md). `release.yml` (changesets/action) opens the "Version Packages" PR; merging publishes with provenance, tags `v<version>`, creates a GitHub Release. Zero repository secrets: only `GITHUB_TOKEN` + OIDC. `pages.yml` deploys docs + latest registries (`withastro/action`, `deploy-pages`).
- Open item needing user confirmation: `release.yml` keeps `actions/setup-node` (Node 22) + `npm i -g npm@latest` solely because npm Trusted Publishing needs real npm >= 11.5.1; everything else is bun. Pending release steps (remote, Pages, first publish, provenance and CDN verification) are listed in RELEASING.md.

## 10. Decisions log (still binding, with why)

Environment and process
- npm scope is `@edmi-ui` (`@edmi-ui/tokens`, `@edmi-ui/registry-*`, private workspaces too) because the `edmi` npm org is unavailable. The shadcn registry namespace stays `@edmi` (`@edmi/<item>`, `registries["@edmi"]`); never confuse the two. Why: user decision.
- Bun-only, no Node, no `gh`. Any CLI failing under bun: try `bunx --bun`, then report the exact command and error before switching approach. Why: user decision.
- No git remote yet; commit locally on `main`. GitHub owner `viandwi24`, Pages `https://viandwi24.github.io`, base `/edmi-ui`.
- Official scaffolders only; copy commands from the tool's current docs; hand-write only what no CLI generates. Why: flags drift, CLI output is the convention.
- Decisions not covered here: choose the option closest to stock shadcn behaviour and record it in this section.

Spec and design
- Binding spec is `refs/edmi-ui` v2 (flat by default, `raised` opt-in, control height `h-9`). Why: user replaced the spec; the new DESIGN.md has no distribution section, so the registry distribution below stays unchanged.
- Flat default is a default-look change ⇒ minor while 0.x. Ghost/link/Tabs-line never raised.
- Menubar raised has no recipe string: `border-b-lip shadow-btn-outline` derived from board 07; bar `rounded-[10px] p-[3px]`, triggers `h-[30px] px-3`. AlertDialog accepts `raised` like Dialog (it is a dialog); Sheet/Drawer/HoverCard/menus are flat only.
- Cross-port consistency: DatePicker/DateRangePicker forward `raised` to trigger + Calendar; choice card checked = `border-ring` + 1px ring in all ports; Message avatar is top-aligned (spec) not stock bottom-aligned; questionnaire shortcut key left of label, check indicator right (board); checkbox/radio indicators in menus sit in the left 16px slot (board, menubar).
- Recipe classes are inlined per component; Base UI selectors are bracket attributes so components do not depend on `shadcn/tailwind.css`.
- Inset panel is its own `registry:ui` item (`inset-panel`), not a Card variant. Badge has ✦ `shape` (default|pill|number). Toggle-group ✦ `variant="segmented"`; accordion ✦ `variant=card`; carousel ✦ `CarouselDots`.
- Icons: default **Phosphor**, switchable. (Supersedes DESIGN.md v1's lucide.) React/Svelte via IconPlaceholder, Vue via init `--icon-library phosphor`.

Registry and tooling
- Generator split: pure logic `scripts/lib/registry.ts` (tested) + CLI; manifest overlays `<group>.vue.ts`/`.svelte.ts` so ports never conflict; per-fw `skip`; `aggregate: "ui"` for `all`/`edmi`; `optionalRegistryDependencies`.
- `theme` carries the whole `@theme inline` map in `cssVars.theme`, plus base-layer `border-color`/`body` rules and `[data-raised]`; font items set `selector` (`html`, `code, kbd, samp, pre`) or mono wins; font deps are `@fontsource-variable/*`.
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

Superseded and intentionally dropped: lucide as default icon set; raised-by-default look and `h-[38px]` controls (v1 spec); plan-era parallel-worker ownership rules and `plans/requests`; `registry:font` for Vue/Svelte; the "utils item for all ports" idea; `data-raised` as a styling hook (the base rule stays harmless).

## 11. Known gotchas

- **bunx quirks:** shadcn-svelte and `sv` need `bunx --bun` (plain bunx fails to download add-ons and `init` has no `--yes`; smoke feeds Enter on stdin). `shadcn view/add` for some React items (accordion, collapsible, resizable, direction) need `bunx --bun`. `bunx changeset init` needs `bunx --bun` plus Enter on stdin.
- **Interactive prompts hang at 100% CPU** under the node shim. Always pass `</dev/null` or `yes`/flags, never leave a CLI waiting, and **kill stray CLI/dev-server processes** you start (`ps`, `lsof -i :<port>`). Concurrent `bunx` runs can corrupt the shared temp cache: do not run several shadcn CLIs at once.
- shadcn-vue 2.8.x has no `--dry-run`/`--view`, and `init <url>/edmi.json` does not work (ignores item `config`, mangles `registry:lib` paths). Supported flow: init, `registries.@edmi`, `add @edmi/theme @edmi/all --overwrite`.
- shadcn-svelte registry items are strict; `registry:block` installs flat; duplicate `IconPlaceholder` imports break calendar/data-table (import once per file). Its `--preset` accepts codes only.
- React `shadcn add` rewrites only `@/registry/<style>/…` imports; it also writes the stock deps of an item. It may touch `package.json`: revert.
- Font items use `@fontsource-variable/*`; Vue/Svelte get Google Fonts `@import url(...)` inside theme `css`.
- Astro dev may log a `$RefreshSig$` quirk with React islands; a brand-new demo file needs an `astro dev` restart (islands generated at config load). Components using `client:visible` and portalled content in previews render outside the `.dark` wrapper (preview limitation, not a registry bug). Starlight `<Tabs>` break prerender.
- The built-in browser only delivers real clicks to a fronted tab; low-resolution screenshots hide 1px issues, so audit computed styles.
- The Vue data-table dropdown triggers could not be reproduced as not opening on click; `cmdk` parts crash without `<Command>` (fixed in `CommandDialog`).
- Radix/Reka/Bits `data-[state=…]` and Base UI attributes differ: copying class strings between React and the others without the swap silently breaks states. `peer-checked` cannot reach nested spans: use `group-has-[:checked]/name`.
- Svelte/Vue `typecheck` runs through wrappers; if it fails after a CLI added files, check for untracked stock deps first.
- This is a shared working tree in multi-agent sessions: never `git stash`, `reset --hard`, `checkout .`, `clean`, `rebase`; stage explicit paths only.

## 12. Guidance for AI agents (and humans acting like one)

How to approach a task
1. Read this file, then `refs/edmi-ui/DESIGN.md` §4 (and §5 for the component you touch). Look at the relevant board PNGs. Skim existing neighbours in the same group in all three ports before writing; copy their conventions.
2. Plan the three-port impact first: React, Vue, Svelte, manifest (3 files), demos (+ `-raised`), mdx, changeset, verify-matrix lists.
3. Use official CLIs and **open the tool's current docs for the command and flags**; do not run from memory. Prefer non-interactive flags with `</dev/null`.
4. Keep the ports in sync; the same recipe strings, differing only by primitive selectors and framework idioms.
5. Never hand-edit generated files (`registry.json`, `apps/docs/public/r/**`, `islands/**`, `packages/registry-*/r`). Do not edit `package.json`/`bun.lock`/`components.json`/`tsconfig*`/`.github/**` unless the task is about them; if a CLI touched them by accident, revert.
6. Do not "improve" §4 rules or invent tokens/variants. Additions are ✦, additive, and listed in the docs mdx.
7. Run the gates in 8 before saying you are done; run the smoke script of every port you changed. Report honestly: what you ran, exit codes, what you did not verify (hover/focus/pressed states, dark portals, StackBlitz). Do not claim checks you skipped.
8. Clean up: kill dev servers/preview processes and CLIs you started, remove temp dirs, do not leave untracked stock deps behind.
9. Scope: stay inside the repo and OS temp dirs; do not install global tools or Node. Ask the user before outward-facing or irreversible actions: publishing to npm, pushing, creating releases, editing GitHub settings, force operations, deleting data.
10. Commits: only when asked; stage explicit paths (never `git add -A`/`.`); conventional messages (`feat(react/forms-text): select`, `fix(vue/v2-qa): …`, `docs: …`); one component per commit; add a changeset for user-visible changes.
11. Record any new decision (and the why) in section 10 and keep this file current when conventions change.

Task prompt template (paste to an agent):
```text
Work in the Edmi UI repo. First read AGENTS.md and refs/edmi-ui/DESIGN.md §4 (+ §5 for <component>).
Task: <what to build or fix>, in all three ports (React/Vue/Svelte), flat by default with `raised` if the spec lists it.
Steps: get stock sources via the official CLIs (copy commands from current docs, non-interactive, `</dev/null`; bunx --bun for shadcn-svelte/sv),
restyle with packages/tokens/src/recipes.ts, update registry.manifest/<group>{,.vue,.svelte}.ts, add demos (+ -raised) and the mdx page,
add a changeset. Do not hand-edit generated files or package.json/bun.lock.
Verify: bun run gen:strict, typecheck, lint, test, build:registry + verify:matrix, docs build, the relevant scripts/smoke/*.sh, and compare
against refs/edmi-ui/screens/edmi-ui-kit/<board>-{light,dark}.png in light/dark, flat/raised.
Clean up any processes you start. Report exactly what you ran and what you could not verify. Do not commit or publish unless I ask.
```

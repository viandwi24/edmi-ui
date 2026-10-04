# Contributing to @edmi-ui/svelte (registry)

Source: `src/lib/registry/{ui,lib,hooks}/<name>/` (physical) + `src/lib/utils.ts` (stock). Imports use the shadcn-svelte defaults: `$lib/utils.js` and `$lib/registry/ui/<x>/index.js` (`registry build` turns them into `$UTILS$`/`$UI$` placeholders; `$lib` is mapped in tsconfig `paths`). Deps are pre-installed: **never touch package.json / bun.lock / components.json / layout.css / tsconfig** (ask the maintainer; see AGENTS.md section 12). Always `bunx --bun` (plain bunx spins at 100% CPU on prompts).

## Per-component procedure
1. Read the shadcn-svelte docs page, DESIGN.md §4/§5 and the board `refs/edmi-ui/screens/edmi-ui-kit/<board>-{light,dark}.png`.
2. `bunx --bun shadcn-svelte@latest add <name> --no-deps-install --overwrite -y </dev/null` writes straight to `src/lib/registry/ui/<name>/` (aliases in components.json). It also writes stock deps of that item (e.g. `button` for `card`): afterwards `git status`, delete untracked stock deps you do not own, `git checkout --` tracked ones, revert package.json if touched. If another worker's files would be hit, take the source from `https://shadcn-svelte.com/registry/styles/nova/<name>.json` instead.
3. Keep anatomy, props, `data-slot`, exports, file names. Classes: inline the strings of `packages/tokens/src/recipes.ts` into `tv()` (tailwind-variants, never cva), selectors per the table; ✦ variants additive. Imports between items: `$lib/registry/ui/<x>/index.js`.
4. Icons: use `<IconPlaceholder lucide=".." tabler=".." hugeicons=".." phosphor=".." remixicon=".." />` (import `$lib/components/icon-placeholder/icon-placeholder.svelte`, a dev-only shim here, not shipped); the CLI rewrites it to the consumer's `iconLibrary` (Edmi default: phosphor, `components.json` is already set to it).
5. Manifest overlay `registry.manifest/<group>.svelte.ts` (template below) -> `bun run gen && bun run typecheck`. Omit `dependencies`: `registry build` infers them with versions.
6. Docs: demo `apps/docs/src/demos/svelte/<name>.svelte` (runes, imports `@edmi-svelte/ui/<x>` -> `packages/svelte/src/lib/registry/ui/<x>`).
7. Changeset `.changeset/svelte-<group>-<name>.md`; gates `bun run gen && bun run typecheck && bun run lint && bun test && bash scripts/smoke/svelte.sh`; commit `feat(svelte/<group>): <name>` with `git add <your paths>`.

## Selectors (Bits UI; recipes already use them)
`data-[state=open|checked|on|active]`, `data-[highlighted]`, `data-[disabled]`, `aria-invalid`, `data-[orientation=vertical]`; animate with `data-[state=open]:animate-in`. Polymorphic: Bits `child` snippet; links as buttons: `buttonVariants()` on a plain `<a>` (or `<Button href>`).

## Manifest entry (`<group>.svelte.ts`, key = item name from `<group>.ts`)
```ts
export const entries: Record<string, FrameworkEntry> = {
	x: { files: [{ path: "src/lib/registry/ui/x/x.svelte" }, { path: "src/lib/registry/ui/x/index.ts" }],
		registryDependencies: ["button"] }, // Edmi names -> full URLs; omit unless needed; svelte keys of meta items: meta.svelte.ts
};
```
Build: `bun run gen && (cd packages/svelte && bunx --bun shadcn-svelte@latest registry build --output ../../apps/docs/public/r/svelte)`. Install is URL-only: `bunx --bun shadcn-svelte@latest add <url>/x.json`.

## Flat default + `elevation` (v4 convention)
Every component is FLAT by default (solid fill + 1px border, no gradient/bevel/shadow). Depth is the `elevation` prop; the full convention is AGENTS.md section 5 "Elevation (v4)":
- `elevation = "auto"` in `$props()`, same name as React/Vue. Resolve it with `useElevation(() => elevation, role)` from `$lib/registry/ui/elevation/index.js` (returns `{ current }`) and pass `level.current` to the `tv()` call (variant `elevation: { sunken, flat, raised, floating }` + `compoundVariants`, strings verbatim from `recipes.ts`) or to the plain surface classes. Bits UI keeps `data-[state=…]` verbatim.
- Containers pass it down to children through **context** with a getter object so it stays reactive: `setContext("x", { get elevation() { return elevation } })` in the container (module-script `setXCtx`/`getXCtx` helpers, see `tabs-list.svelte`, `toggle-group.svelte`, `pagination.svelte`, `bubble-reactions.svelte`, `kanban-column.svelte`, Questionnaire root context). Children resolve their own prop, then the container value, then `useElevation`.
- Card-based patterns type their props as `ComponentProps<typeof Card>`, so `elevation` flows to the Card automatically; forward it explicitly to any other primitive they render (Button, …).
- `link` buttons and Tabs `line` never take depth. Control height is `h-9`.
- Every component with `elevation` gets a docs demo `apps/docs/src/demos/svelte/<name>-elevation.svelte` (flat / raised / floating / sunken).

## Edmi AI pack (`ai-*` items)
Full rules: AGENTS.md section 7b. Short version for Svelte:
- Source `src/lib/registry/ai/<name>/<part>.svelte` + `index.ts`; the manifest entry is `aiSvelte(name, [files])` in `registry.manifest/ai-<cat>.svelte.ts` (adds `type: registry:component` and an explicit `target: "ai/<name>/<file>"`, which installs to `$lib/components/ai/<name>/`). **Imports between AI items are relative** (`../shimmer/index.js`); ui items `$lib/registry/ui/<x>/index.js`, utils `$lib/utils.js` as usual. Remove the item from `svelte` in `scripts/ai-pending.json`.
- Stock source: `bun run scripts/ai-fetch-stock.ts`, `.ai-src/svelte/<name>.json` (Svelte AI Elements, MIT, 24 items only) and the React source for anatomy/props; the other ~25 items are ported from React.
- `IconPlaceholder` (once per file); `$bindable` instead of controllable-state hooks; snippets for ReactNode props; markdown `svelte-streamdown`; flow `@xyflow/svelte`; Rive `@rive-app/webgl2` (thin wrapper); ANSI `anser`; `tv()` for variants.
- Preview route `src/routes/preview` group `ai-<cat>`; smoke `bash scripts/smoke/svelte.sh` installs `ai-all` as soon as it has items.

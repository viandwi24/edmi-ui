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

## Flat default + `raised` (v2 convention)
Every component is FLAT by default (solid fill + 1px border, no gradient/lip/`shadow-btn-*`/`shadow-card`/`shadow-pop`/`shadow-dialog`). The one-step 3D look is opt-in:
- `raised?: boolean` in `$props()` (default `false`), same name as React/Vue. Pass it to the `tv()` call (boolean variant `raised: { false: "", true: "…" }` + `compoundVariants`, strings verbatim from `recipes.ts`) or append with `cn(…, raised && "…")`. Bits UI keeps `data-[state=…]` verbatim.
- Containers pass it down to children through **context** with a getter object so it stays reactive: `setContext("x", { get raised() { return raised } })` in the container (module-script `setXCtx`/`getXCtx` helpers, see `tabs-list.svelte`, `toggle-group.svelte`, `pagination.svelte`, `bubble-reactions.svelte`, `kanban-column.svelte`, Questionnaire root context). Children resolve `raised ?? ctx?.raised ?? false`, so their own prop wins. Pure CSS fan-out is fine when no JS is needed (`data-raised` + `group-data-[raised]/…`, e.g. InsetPanel body).
- Card-based patterns type their props as `ComponentProps<typeof Card>`, so `raised` flows to the Card automatically; forward it explicitly to any other primitive they render (Button, …).
- `ghost`/`link` buttons and Tabs `line` are never raised. Control height is `h-9`.
- Every raised component gets a docs demo `apps/docs/src/demos/svelte/<name>-raised.svelte` (flat vs raised side by side).

# Contributing to @edmi-ui/vue (registry)

Source: `registry/ui/<name>/{<Part>.vue,index.ts}` (physical), imported as `@/registry/edmi/ui/<name>` (barrel, e.g. `import { Button } from "@/registry/edmi/ui/button"`); `cn` from `@/registry/edmi/lib/utils`. The CLI rewrites both to the consumer's aliases on install. Deps are pre-installed: **never touch package.json / bun.lock / components.json / src/style.css** (ask the maintainer; see AGENTS.md section 12). Icons: import from `@lucide/vue` only (the CLI rewrites them to the consumer's `iconLibrary`; Edmi default is `phosphor`, see below).

## Per-component procedure
1. Read the shadcn-vue docs page, DESIGN.md §4/§5 and the board in `refs/edmi-ui/screens/edmi-ui-kit/`. Port from the React file in `packages/react/registry/ui/` (same recipe strings).
2. shadcn-vue has no `--dry-run`: only run `bunx shadcn-vue@latest add <name> -y </dev/null` if you own every file it writes (it also writes its stock deps, e.g. `button`); otherwise take the stock source from `https://www.shadcn-vue.com/r/styles/new-york-v4/<name>.json` (or let it run, then `git status` and delete only what you created).
3. Keep anatomy, props, `data-slot`, `index.ts` barrel. Replace classes with `packages/tokens/src/recipes.ts` (inline), swap selectors (table), add ✦ variants additively. Use `data-[state=…]` brackets, not shadcn-vue's custom variants (`data-open:`, `data-horizontal:`). Imports between items: `@/registry/edmi/ui/<other>`.
4. Layout rules the CLI imposes (verified on 2.8.2): every item's files must sit in ONE directory `registry/ui/<name>/` (the install path is derived from the common root of the files being installed together). **Single files under `registry/lib/` or `registry/hooks/` get written to `src/lib/registry/lib/...`** when installed next to other items, so do not ship standalone lib/composable items: keep helpers (`useX.ts`) inside the item dir. `utils` is not shipped for Vue (`shadcn-vue init` always creates `src/lib/utils.ts`).
5. Manifest overlay in `registry.manifest/<group>.vue.ts` (template below) -> `bun run gen`.
6. Preview: `src/preview/<group>.vue` (auto-discovered, light+dark, `bun run dev`).
7. Docs demo `apps/docs/src/demos/vue/<name>.vue` (imports `@edmi-vue/ui/<name>`); changeset `.changeset/vue-<group>-<name>.md`; gates `bun run gen && bun run typecheck && bun run lint && bun test && bash scripts/smoke/vue.sh`; commit `feat(vue/<group>): <name>` with `git add <your paths>`.

## Flat default + `elevation` ✦ (spec v4)
Every component is flat by default (solid fill + 1px border; no gradients, bevel or shadows). Depth is the `elevation?: "auto" | "sunken" | "flat" | "raised" | "floating"` prop (same name in all ports), never inferred; the full convention is AGENTS.md section 5 "Elevation (v4)".
- **Primitive** (Button, Toggle, Kbd, Card, ...): resolve with `useElevation(() => props.elevation, role)` from `@/registry/edmi/ui/elevation` (returns a `ComputedRef`) and pass `level.value` to the cva `elevation` variant + `compoundVariants` copied verbatim from `packages/tokens/src/recipes.ts` (e.g. `buttonVariants({ variant, size, elevation: level.value })`). Keep Reka selectors (`data-[state=…]`). `link` Buttons and the `line` Tabs variant never take depth.
- **Containers pass it down with `provide`/`inject`** (plain string key, a getter object so it stays reactive): `provide('tabsList', { get elevation() { return props.elevation } })` in TabsList, ToggleGroup, Pagination, BubbleReactions, KanbanColumn, ButtonGroup; the child resolves its own prop, then the container value, then `useElevation`.
- **Patterns** never hard-code depth: each takes `elevation` and forwards it to the Card/Button/etc. it renders.
- Docs: every component with `elevation` gets `apps/docs/src/demos/vue/<name>-elevation.vue` (flat / raised / floating / sunken) and is listed in the matching `src/preview/<group>.vue`.

## Boolean props
Vue Boolean-casts an absent `boolean` prop to `false`, so an optional boolean alone already means "off". Spell the default with `withDefaults(defineProps<…>(), { … })` on components that own the look. **Use `{ elevation: undefined }` (treated as `auto`) for `elevation` and for anything that inherits from a parent via `inject`** (ToggleGroupItem, TabsTrigger, PaginationItem, BubbleReaction, KanbanItem): with a concrete default the child could never fall back to the container's or scope's value. The same rule applies to `defaultOpen`/`defaultChecked`/`pressed` that fall back to something else (e.g. a cookie): `withDefaults(defineProps<{ defaultOpen?: boolean }>(), { defaultOpen: undefined })`. Never forward `elevation` to a Reka primitive (`reactiveOmit(props, 'elevation', …)`), or it lands in the DOM as an attribute.

## Selectors (Reka UI; the recipes already use this convention)
open `data-[state=open]` · checked `data-[state=checked]` · on `data-[state=on]` · active tab `data-[state=active]` · highlighted `data-[highlighted]` · disabled `data-[disabled]`, invalid `aria-invalid` · enter/exit `data-[state=open]:animate-in` · polymorphic `as-child` (`Primitive`). Links as buttons: `buttonVariants()` on `<a>`.

## Manifest entry (`registry.manifest/<group>.vue.ts`, item must exist in `<group>.ts`)
```ts
export const entries: Record<string, FrameworkEntry> = {
	x: { files: [{ path: "registry/ui/x/X.vue" }, { path: "registry/ui/x/index.ts" }],
		dependencies: ["reka-ui", "class-variance-authority"] }, // npm packages imported; registryDependencies: Edmi names only (e.g. ["button"])
};
```
## Tooling notes
- `vue-tsc` cannot patch tsc under Bun (it relies on `fs.readFileSync` hooks); `bun scripts/vue-tsc.mjs` applies the same patch. `bun run typecheck` uses it.
- `shadcn-vue init <url>/edmi.json` does not work in 2.8.2 (ignores item `config`, mangles `registry:lib` paths). Supported flow: `init`, add `registries.@edmi-ui`, `add @edmi-ui/theme @edmi-ui/all --overwrite`.
- Icon names (enforced by `scripts/smoke/vue-icons.ts`, run from `scripts/smoke/vue.sh`): the CLI only rewrites an `@lucide/vue` import whose name is a key of https://www.shadcn-vue.com/r/icons/index.json, tried as-is and then without a trailing `Icon` (`CheckIcon` -> `Check` ok, `ChartLine` has no key but `ChartLineIcon` does, `Wallet` -> `WalletIcon`). An unmapped name stays imported from the consumer's icon package and breaks typecheck. It needs a `phosphor` + `lucide` mapping; pick another mapped glyph if none fits (no `EyeOff`, `Columns3`, `Briefcase`, `Link`, `ThumbsUp`).
- Icons: shadcn-vue rewrites `@lucide/vue` imports to `components.json` `iconLibrary` (lucide, radix, tabler, phosphor, hugeicons, remixicon) via its icon map; it cannot be set from a registry item, so Edmi's default Phosphor = `init --style nova --icon-library phosphor …` (verified: `--preset` forces lucide; imports become e.g. `PhPlus` from `@phosphor-icons/vue`).
- Docs island: registry files import each other as `@/registry/edmi/ui/<x>` / `@/registry/edmi/lib/utils`; the docs Vite resolver must map those (for importers under `packages/vue/registry`) to `packages/vue/registry/*`, and demos' `@edmi-vue/ui/<x>` to `packages/vue/registry/ui/<x>`.

## Edmi AI pack (`ai-*` items)
Full rules: AGENTS.md section 7b. Short version for Vue:
- Source `registry/components/ai/<name>/<Part>.vue` + `index.ts` (installs to `components/ai/<name>/`); imports `@/registry/edmi/components/ai/<x>` (AI) and `@/registry/edmi/ui/<x>` (ui); `cn` from `@/registry/edmi/lib/utils`. Item helper: `aiVue(name, ["Message.vue", ...], deps)` in `registry.manifest/ai-<cat>.vue.ts`; remove the item from `vue` in `scripts/ai-pending.json`; never name a dir `ui*`/`lib*`.
- Stock source: `bun run scripts/ai-fetch-stock.ts`, `.ai-src/vue/<name>.json` (ai-elements-vue, Apache-2.0; no `jsx-preview`, port it from React or write a runtime template renderer) and the React source for anatomy/props.
- Icons `@lucide/vue` and only names that are keys of the shadcn-vue icon index (`scripts/smoke/vue-icons.ts` checks); controllable state via `useVModel` (`@vueuse/core`); markdown `vue-stream-markdown`; flow `@vue-flow/*`; motion `motion-v`; Rive `@rive-app/webgl2`; ANSI `ansi-to-vue3`.
- `withDefaults(..., { elevation: undefined })` for `elevation`, `data-[state=...]` selectors (Reka), as in the ui items.
- Preview `src/preview/ai-<cat>.vue`; smoke `bash scripts/smoke/vue.sh` installs `ai-all` as soon as it has items.

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

## Flat default + `raised` ✦ (spec v2)
Every component is flat by default (solid fill + 1px border; no gradients, `-hi/-edge` borders, lips or `shadow-card/pop/dialog/btn-*`). The one-step 3D look is opt-in with `raised?: boolean` (same prop name in all ports), never inferred.
- **Primitive** (Button, Toggle, Kbd, Card, ...): `raised` prop (or a cva `raised: { false, true }` variant + `compoundVariants` copied verbatim from `packages/tokens/src/recipes.ts`, e.g. `buttonVariants({ variant, size, raised })`). cva boolean variants take real booleans, not strings. Keep Reka selectors (`data-[state=…]`) as in the recipes. `ghost`/`link` Buttons and the `line` Tabs variant are never raised.
- **Containers pass it down with `provide`/`inject`** (plain string key, a getter object so it stays reactive): `provide('tabsList', { get raised() { return props.raised } })` in TabsList, ToggleGroup, Pagination, BubbleReactions, KanbanColumn; Questionnaire adds `raised` to its typed root context. The child resolves `props.raised ?? context?.raised ?? false`, so a child's own `raised` always wins.
- **Patterns** never hard-code the 3D look: each takes `raised` and forwards it to the Card/Button/etc. it renders.
- Docs: every raised component gets `apps/docs/src/demos/vue/<name>-raised.vue` (flat vs raised side by side) and is listed in the matching `src/preview/<group>.vue`.

## Boolean props
Vue Boolean-casts an absent `boolean` prop to `false`, so `raised?: boolean` alone already means "off". Spell the default with `withDefaults(defineProps<…>(), { raised: false })` on components that own the look (it documents the default and keeps the cva call typed). **Use `{ raised: undefined }` for anything that inherits from a parent via `inject`** (ToggleGroupItem, TabsTrigger, PaginationItem, BubbleReaction, KanbanItem): with a `false` default the child could never fall back to the container's value. The same rule applies to `defaultOpen`/`defaultChecked`/`pressed` that fall back to something else (e.g. a cookie): `withDefaults(defineProps<{ defaultOpen?: boolean }>(), { defaultOpen: undefined })`. Never forward `raised` to a Reka primitive (`reactiveOmit(props, 'raised', …)`), or it lands in the DOM as an attribute.

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
- `shadcn-vue init <url>/edmi.json` does not work in 2.8.2 (ignores item `config`, mangles `registry:lib` paths). Supported flow: `init`, add `registries.@edmi`, `add @edmi/theme @edmi/all --overwrite`.
- Icon names (enforced by `scripts/smoke/vue-icons.ts`, run from `scripts/smoke/vue.sh`): the CLI only rewrites an `@lucide/vue` import whose name is a key of https://www.shadcn-vue.com/r/icons/index.json, tried as-is and then without a trailing `Icon` (`CheckIcon` -> `Check` ok, `ChartLine` has no key but `ChartLineIcon` does, `Wallet` -> `WalletIcon`). An unmapped name stays imported from the consumer's icon package and breaks typecheck. It needs a `phosphor` + `lucide` mapping; pick another mapped glyph if none fits (no `EyeOff`, `Columns3`, `Briefcase`, `Link`, `ThumbsUp`).
- Icons: shadcn-vue rewrites `@lucide/vue` imports to `components.json` `iconLibrary` (lucide, radix, tabler, phosphor, hugeicons, remixicon) via its icon map; it cannot be set from a registry item, so Edmi's default Phosphor = `init --style nova --icon-library phosphor …` (verified: `--preset` forces lucide; imports become e.g. `PhPlus` from `@phosphor-icons/vue`).
- Docs island: registry files import each other as `@/registry/edmi/ui/<x>` / `@/registry/edmi/lib/utils`; the docs Vite resolver must map those (for importers under `packages/vue/registry`) to `packages/vue/registry/*`, and demos' `@edmi-vue/ui/<x>` to `packages/vue/registry/ui/<x>`.

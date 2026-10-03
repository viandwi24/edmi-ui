# Contributing to @edmi-ui/react (registry)

Source: `registry/{ui,lib,hooks,blocks}/` (physical) imported as `@/registry/edmi/ui/<x>`; `cn` from `"cn"`. Deps are pre-installed: **never touch package.json / bun.lock / components.json / src/index.css** (ask the maintainer; see AGENTS.md section 12).

## Per-component procedure
1. Read the shadcn docs page and DESIGN.md §4/§5 + the board `refs/edmi-ui/screens/edmi-ui-kit/<board>-{light,dark}.png`.
2. `bunx shadcn@latest add <name> --dry-run` to see which files it would write, then `yes n | bunx shadcn@latest add <name>` (answers "no" to every existing file). It writes to `registry/ui/<name>.tsx` and rewrites imports to `@/registry/edmi/ui/...`. Afterwards `git status`: delete untracked stock deps you do not own, `git checkout --` anything tracked, and revert package.json if touched.
3. Keep anatomy, props, `data-slot`, exports. Replace classes with `packages/tokens/src/recipes.ts` (inline the strings), swap selectors (table below), add ✦ variants additively. Imports between items: `@/registry/edmi/ui/button` only.
4. Manifest entry in `registry.manifest/<group>.ts` (template below) -> `bun run gen`.
5. Preview: `src/preview/<group>.tsx` (default export, shown light+dark by `bun run dev`, auto-discovered); compare to the board.
6. Docs: demo `apps/docs/src/demos/react/<name>.tsx`, page `apps/docs/src/content/docs/components/<group>/<name>.mdx` (React worker creates it).
7. Changeset `.changeset/react-<group>-<name>.md`; gates `bun run gen && bun run typecheck && bun run lint && bun test && bash scripts/smoke/react.sh`; commit `feat(react/<group>): <name>` with `git add <your paths>`.

## Selectors (recipes use Radix style; React = Base UI; use bracket attributes)
| Meaning | Base UI |
|---|---|
| open popup / its trigger | `data-[open]` / `data-[popup-open]` |
| checked / on | `data-[checked]` / `data-[pressed]` |
| active tab | `data-[active]` |
| highlighted item | `data-[highlighted]` |
| disabled / invalid | `data-[disabled]` / `data-[invalid]`, `aria-invalid` |
| enter / exit | `data-[starting-style]` / `data-[ending-style]` |
| polymorphic | `render={<a />}`, no asChild; links as buttons: `buttonVariants()` on `<a>` |

## Manifest entry
```ts
{ name: "x", title: "X", description: "...", type: "registry:ui", categories: ["Display"],
  registryDependencies: ["button"],   // Edmi names only, never stock items
  docs: "Replaces the stock x: `shadcn add @edmi-ui/x --overwrite`.",
  frameworks: { react: { files: [{ path: "registry/ui/x.tsx" }],
    dependencies: ["@base-ui/react", "class-variance-authority", "cn"] } } }
```
`dependencies` = npm packages the file imports. Blocks: `type: "registry:block"`, files under `registry/blocks/<name>/`.

## Icons (Phosphor default, consumer-switchable)
No icon-package imports in `registry/**`/demos. Use `import { IconPlaceholder } from "@/edmi/icon-placeholder"` (local dev runtime, never shipped):
`<IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" className="size-4" />`
The shadcn CLI rewrites it to the consumer's `iconLibrary`. All 5 props required (copy from stock base-nova JSON; verify new names); self-closing JSX only (no `icon={X}` refs);
no icon package in manifest `dependencies` (only the `edmi` base lists `@phosphor-icons/react`).

## Raised ✦ (v2: flat default)
Every component is flat by default (solid fill + 1px border). The one-step 3D look is opt-in with `raised?: boolean` (default `false`), same prop name in all ports:
- cva components: variant `raised: { false: "", true: "…" }` + `compoundVariants` copied from `packages/tokens/src/recipes.ts` (Base UI selector swap per table above), `defaultVariants.raised = false`; the component destructures `raised = false` and passes it to the cva call.
- Plain components: `raised && "…"` inside `cn(...)`.
- Containers pass it down: TabsList / ToggleGroup / Pagination / Questionnaire / BubbleReactions use a `React.createContext` in the same file; children use `raised ?? context.raised`. Patterns forward `raised` to the Card / Button they render and never hard-code lips or shadows.
- `ghost` / `link` buttons and the Tabs `line` variant are never raised. Control height is `h-9`.
- Each raised component needs `apps/docs/src/demos/react/<name>-raised.tsx`, a `## Raised ✦` section and a `raised` API row in its mdx page.

## Edmi AI pack (`ai-*` items)
Full rules: AGENTS.md section 7b. Short version for React:
- Source `registry/components/ai/<name>.tsx` (installs to `components/ai/`), hooks `registry/hooks/ai/*.ts`; imports `@/registry/edmi/components/ai/<x>` (AI), `@/registry/edmi/ui/<x>` (ui), `@/registry/edmi/hooks/ai/<x>`; `cn` from `"cn"`. Item helper: `aiReact(name, deps)` in `registry.manifest/ai-<cat>.ts`; remove the item from `react` in `scripts/ai-pending.json`.
- Stock source: `bun run scripts/ai-fetch-stock.ts` then read `.ai-src/react/<name>.tsx` (and `example-<name>*.json` for demos). Port: Radix to Base UI (`asChild` -> `render`, menu `onSelect` -> `onClick`, HoverCard delays on the **Trigger**, no `@radix-ui/*`, `useControllableState` from `@/registry/edmi/hooks/ai/use-controllable-state`), `lucide-react` -> `IconPlaceholder` (`bun run scripts/ai-icon.ts <LucideName> size-4`), `@/lib/utils` -> `cn`, header `// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.` (after `"use client"`).
- Build on ui items, never copy them (`ui` never imports `ai`). Tokens only, flat by default, `raised` only where the spec lists it, solid tints (no `/NN` on bg/border), no assistant avatar by default, status text in a ghost bubble, terminal always dark.
- `ai` is v7 (types changed vs the stock: `outputTokenDetails.reasoningTokens`, `inputTokenDetails.cacheReadTokens`).
- Preview: `src/preview/ai-<cat>.tsx` (`ai-chat.tsx` is the reference page); smoke: `bash scripts/smoke/react.sh` installs `@edmi-ui/ai-all` and type-checks it.

# Framework notes

The same item names, props, `data-slot` attributes and `elevation` semantics exist in all three ports. Only the primitives and idioms differ.

| | React | Vue | Svelte |
| --- | --- | --- | --- |
| Primitives | Base UI | Reka UI | Bits UI |
| Stock library / CLI | shadcn/ui, `shadcn` | shadcn-vue, `shadcn-vue` | shadcn-svelte, `shadcn-svelte` |
| Registry | `@edmi-ui/<name>` namespace | `@edmi-ui/<name>` namespace | URLs only |
| Variants | `cva` | `cva` | `tailwind-variants` (`tv()`) |
| Import | `@/components/ui/button` | `@/components/ui/button` | `$lib/components/ui/button` |

## React (Base UI)

- Polymorphism is `render={<a href="/x" />}`, never `asChild`. A link styled as a button: `<a className={buttonVariants({ variant: "outline" })}>` or `<Button render={<a href="/x" />}>`.
- Compound components are named exports: `import { Card, CardHeader, CardTitle } from "@/components/ui/card"`.
- Events on menu items are `onClick` (not `onSelect`).
- State attributes for custom styling are bracket attributes: `data-[active]`, `data-[pressed]`, `data-[checked]`, `data-[open]`, `data-[popup-open]`, `data-[highlighted]`, `data-[disabled]`.
- `elevation` is a normal prop (`"auto" | "sunken" | "flat" | "raised" | "floating"`); `buttonVariants({ variant, size, elevation })` for class names; wrap a subtree in `<ElevationProvider mode="layered">`.
- Client components start with `"use client"` where the CLI added it; keep it.

## Vue (Reka UI)

- Polymorphism is `as-child`. Props are kebab-case in templates (`default-value`, `as-child`); events are `@update:modelValue` / `v-model`.
- Compound components are named exports from the barrel: `import { Card, CardHeader } from "@/components/ui/card"`.
- Selectors are `data-[state=open|checked|on|active]`.
- `elevation` is a string prop: `<Button elevation="raised">` or `:elevation="level"`. Do not forward `elevation` to a Reka primitive yourself. `ElevationProvider` takes `mode` / `level` (and `as` / `as-child`).
- Icons must exist in the shadcn-vue icon map to be rewritten to the project's library; prefer the project's own icon imports in app code.
- Typecheck with the project's `vue-tsc`.
- Chat items: `MessageResponse` takes `:content`; composer events are `@submit`, `@stop`.

## Svelte (Bits UI, Svelte 5)

- Registry is URL-only (see [install.md](install.md)); there are no `@edmi-ui/...` names.
- Compound components are namespaced: `import * as Card from "$lib/components/ui/card"` then `<Card.Root elevation="raised">`, `<Card.Header>`; single components use named imports (`import { Button } from "$lib/components/ui/button"`).
- `ElevationProvider` takes `mode` / `level` and a `child` snippet instead of `as-child`; `useElevation(() => elevation, role)` returns `{ current }`.
- Polymorphism is the Bits `child` snippet; a link as a button is `<Button href="/x">` or `buttonVariants()` on an `<a>`.
- Props use runes: `$bindable` for two-way values, snippets instead of ReactNode props, callbacks are `onX` props (`onSubmit`, `onStop`), not events.
- Selectors are `data-[state=...]`, `data-[orientation=...]`, `data-[highlighted]`.
- Chat items: `MessageResponse` takes `content`; `PromptInputSelect` needs `type="single"`.
- Import an icon once per file; duplicate icon imports break the build.
- SvelteKit apps should read theme cookies in `hooks.server.ts` (see [theming.md](theming.md)).

## Cross-framework parity

When asked to build the same screen in several frameworks, keep class strings and token usage identical and change only the idioms above. Stock examples of every screen in all three frameworks are at https://viandwi24.github.io/edmi-ui/examples/ (each has a Code tab).

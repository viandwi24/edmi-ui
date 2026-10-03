# registry.manifest

One file per group; each exports `items: Item[]`. Append entries only. Order is irrelevant
(the generator sorts by name). `bun run gen` writes `packages/<fw>/registry.json` for every
`packages/<fw>` that exists; `bun run gen:strict` (or `CI=true`) turns missing files into errors.

```ts
{
	name: "button",
	title: "Button",
	description: "Raised, pressable action control.",
	type: "registry:ui",
	categories: ["Actions"],                   // DESIGN.md §5 group
	registryDependencies: ["utils"],           // Edmi names only; rewritten per framework
	docs: "Replaces the stock button: `shadcn add @edmi-ui/button --overwrite`.",
	frameworks: {
		react: {
			files: [{ path: "registry/ui/button.tsx" }],   // relative to packages/react
			dependencies: ["class-variance-authority"],
		},
		vue: { files: [{ path: "registry/ui/button/Button.vue" }, { path: "registry/ui/button/index.ts" }] },
		svelte: { skip: true },                // omit for a framework; deps on it then error
	},
}
```

Per-framework overrides: `type`, `registryDependencies`, plus passthrough `cssVars`, `css`,
`config`, `font`, `envVars`, `meta`. Omit a framework key to not ship the item there.
`utils` (registry:lib, plan 04) is a normal dependency name. Every dependency must exist here.

## Edmi AI pack

AI items are built with the helpers in `ai-shared.ts` (`aiItem`, `aiReact`, `aiVue`, `aiSvelte`) in the `ai-<category>.ts` groups (+ `.vue.ts` / `.svelte.ts` overlays). Names are `ai-<stock name>`, category `AI · <Chat|Agent|Code|Runtime|Voice|Workflow|Patterns|Utilities>` (the prefix `AI · ` is what keeps them out of `all`/`edmi` and puts them in `ai-all`). `registryDependencies` are ui item names or other `ai-*` names. Items not ported for a framework have no entry there and are listed in `scripts/ai-pending.json`. Details: AGENTS.md section 7b.

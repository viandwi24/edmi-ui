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

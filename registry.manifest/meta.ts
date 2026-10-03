import { readFileSync } from "node:fs";
import { getCssVars } from "../packages/tokens/src/css-vars.ts";
import type { CssTree, FrameworkEntry, Item } from "./types.ts";

const tokensSrc = (f: string) =>
	readFileSync(new URL(`../packages/tokens/src/${f}`, import.meta.url), "utf8");

/** Declarations inside `@theme inline { ... }` of theme.css (fonts, radii, color + shadow maps). */
function themeInlineVars(): Record<string, string> {
	const css = tokensSrc("theme.css").replace(/\/\*[\s\S]*?\*\//g, "");
	const start = css.indexOf("@theme inline");
	const open = css.indexOf("{", start);
	const close = css.indexOf("\n}", open);
	const out: Record<string, string> = {};
	for (const m of css
		.slice(open + 1, close)
		.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g))
		out[m[1] as string] = (m[2] as string).trim();
	return out;
}

/**
 * Fonts ship as Fontsource *variable* packages (wght 100-900 in one file), so 400/500/600 all load.
 * The shadcn font CLI ignores `font.weight` for non-Next projects and only emits
 * `@import "@fontsource/<font>"` (weight 400), so we point `dependency` at the variable package.
 */
const FONT_FAMILIES = {
	sans: "'Instrument Sans Variable', system-ui, sans-serif",
	mono: "'JetBrains Mono Variable', ui-monospace, monospace",
	brand: "'Sora Variable', system-ui, sans-serif",
};
const FONT_PACKAGES = [
	"@fontsource-variable/instrument-sans",
	"@fontsource-variable/jetbrains-mono",
	"@fontsource-variable/sora",
];

const cssVars = (() => {
	const v = getCssVars();
	// shadcn only maps light/dark keys to --color-*; ship the full @theme inline map so
	// utilities like shadow-btn-primary and border-2 resolve without theme.css.
	return {
		theme: {
			...v.theme,
			...themeInlineVars(),
			"font-sans": FONT_FAMILIES.sans,
			"font-mono": FONT_FAMILIES.mono,
			"font-brand": FONT_FAMILIES.brand,
		},
		light: v.light,
		dark: v.dark,
	};
})();

const baseRule: CssTree = {
	"@layer base": {
		// theme.css base layer: a fresh `init <edmi.json>` project has no shadcn base rules.
		"*": { "border-color": "var(--border)" },
		body: {
			"background-color": "var(--background)",
			color: "var(--foreground)",
			"-webkit-font-smoothing": "antialiased",
		},
		// gradients on raised controls must cover the border (DESIGN §4.2)
		"[data-raised]": { "background-origin": "border-box" },
	},
};

/**
 * Vue/Svelte have no registry:font: the theme `css` imports the Fontsource variable packages (bare
 * package imports, like tw-animate-css; a Google Fonts `@import url()` would land after
 * `@import "tailwindcss"` where it is ignored) and the theme item depends on them.
 */
const themeCssWithFonts: CssTree = {
	...Object.fromEntries(FONT_PACKAGES.map((p) => [`@import "${p}"`, {}])),
	...baseRule,
};

const CAT = ["Meta"];

export const items: Item[] = [
	{
		name: "theme",
		title: "Edmi theme",
		description:
			"Edmi design tokens: light and dark CSS variables, Tailwind v4 theme map, raised-control base rule.",
		type: "registry:theme",
		categories: CAT,
		docs: "Run `add @edmi-ui/theme` first; it merges the Edmi tokens into your global CSS.",
		frameworks: {
			react: { cssVars, css: baseRule },
			vue: {
				cssVars,
				css: themeCssWithFonts,
				dependencies: FONT_PACKAGES,
			},
			svelte: {
				cssVars,
				css: themeCssWithFonts,
				dependencies: FONT_PACKAGES,
			},
		},
	},
	{
		name: "utils",
		title: "Utils",
		description:
			"The `cn` class-merge helper, re-exported from lib/utils for projects that import `@/lib/utils`.",
		type: "registry:lib",
		categories: CAT,
		docs: "Installed automatically with @edmi-ui/edmi; components import `cn` directly from the `cn` package.",
		frameworks: {
			react: {
				files: [{ path: "registry/lib/utils.ts" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "font-instrument-sans",
		title: "Instrument Sans",
		description: "Edmi sans font (Instrument Sans 400/500/600).",
		type: "registry:font",
		categories: CAT,
		docs: "Installs Instrument Sans and wires --font-sans.",
		frameworks: {
			react: {
				font: {
					family: "'Instrument Sans Variable', sans-serif",
					provider: "google",
					import: "Instrument_Sans",
					variable: "--font-sans",
					weight: ["400", "500", "600"],
					subsets: ["latin"],
					selector: "html",
					dependency: "@fontsource-variable/instrument-sans",
				},
			},
		},
	},
	{
		name: "font-jetbrains-mono",
		title: "JetBrains Mono",
		description: "Edmi mono font (JetBrains Mono 400/500/600).",
		type: "registry:font",
		categories: CAT,
		docs: "Installs JetBrains Mono and wires --font-mono.",
		frameworks: {
			react: {
				font: {
					family: "'JetBrains Mono Variable', monospace",
					provider: "google",
					import: "JetBrains_Mono",
					variable: "--font-mono",
					weight: ["400", "500", "600"],
					subsets: ["latin"],
					selector: "code, kbd, samp, pre",
					dependency: "@fontsource-variable/jetbrains-mono",
				},
			},
		},
	},
	{
		name: "font-sora",
		title: "Sora",
		description: "Edmi wordmark font (Sora 600), exposed as --font-brand.",
		type: "registry:font",
		categories: CAT,
		docs: "Installs Sora and wires --font-brand (use the `font-brand` utility for the wordmark).",
		frameworks: {
			react: {
				font: {
					family: "'Sora Variable', sans-serif",
					provider: "google",
					import: "Sora",
					variable: "--font-brand",
					weight: ["600"],
					subsets: ["latin"],
					selector: "[data-edmi-wordmark]",
					dependency: "@fontsource-variable/sora",
				},
			},
		},
	},
	{
		name: "all",
		title: "All Edmi components",
		description:
			"Every Edmi component in one install, for replacing a whole shadcn project (use --overwrite).",
		type: "registry:block",
		categories: CAT,
		aggregate: "ui",
		docs: "Run `add @edmi-ui/theme @edmi-ui/all --overwrite` to restyle every component.",
		frameworks: {
			react: { files: [] },
			vue: { files: [] },
			svelte: { files: [] },
		},
	},
	{
		name: "patterns",
		title: "All Edmi patterns",
		description:
			"Every Edmi ✦ pattern block (headers, stat tiles, tickers, feeds, pricing, kanban and more) in one install. Add it next to `all` for everything.",
		type: "registry:block",
		categories: CAT,
		aggregate: "patterns",
		docs: "Run `add @edmi-ui/patterns` for every pattern block; pair with `@edmi-ui/all` for every component.",
		frameworks: {
			react: { files: [] },
			vue: { files: [] },
			svelte: { files: [] },
		},
	},
	{
		name: "ai-all",
		title: "All Edmi AI components",
		description:
			"Every Edmi AI component (chat, agent output, code, runtime, voice, workflow and the ✦ patterns) in one install. Pair it with `all` and `theme`.",
		type: "registry:block",
		categories: CAT,
		aggregate: "ai",
		docs: "Run `add @edmi-ui/theme @edmi-ui/all @edmi-ui/ai-all --overwrite` for the whole kit with the AI pack. Installs into `components/ai/`.",
		frameworks: {
			react: { files: [] },
			vue: { files: [] },
			svelte: { files: [] },
		},
	},
	{
		name: "edmi",
		title: "Edmi",
		description:
			"The full Edmi design system: theme, fonts and every component. Use as the init base for a new project.",
		// Mapped per port: Vue -> registry:block, Svelte -> registry:style (generator).
		type: "registry:base",
		categories: CAT,
		aggregate: "ui",
		registryDependencies: ["theme"],
		optionalRegistryDependencies: [
			"utils",
			"font-instrument-sans",
			"font-jetbrains-mono",
			"font-sora",
		],
		docs: "Run `init <url>/edmi.json` in a new project to set it up as Edmi.",
		frameworks: {
			react: {
				// `init` also installs a stock style index unless the base extends "none".
				extends: "none",
				// What the stock style index would have added: animations + shadcn's custom variants.
				dependencies: ["tw-animate-css", "shadcn", "@phosphor-icons/react"],
				css: {
					'@import "tw-animate-css"': {},
					'@import "shadcn/tailwind.css"': {},
				},
				config: {
					// "edmi" is not a style the CLI can fetch; keep the Base UI style name.
					style: "base-nova",
					iconLibrary: "phosphor",
					tailwind: { baseColor: "neutral" },
				},
			} satisfies FrameworkEntry,
			vue: {},
			svelte: {},
		},
	},
];

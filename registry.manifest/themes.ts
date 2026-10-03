import {
	listBases,
	listThemes,
	themeItemCssVars,
} from "../packages/tokens/src/css-vars.ts";
import type { Item } from "./types.ts";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Registry item name for a base x theme pair, e.g. `theme-slate-ocean`. */
export const themeItemName = (base: string, theme: string) =>
	`theme-${base}-${theme}`;

/**
 * One `registry:theme` item per base x accent, generated from `packages/tokens/src/{base,themes}/`.
 * Drop a CSS file into either folder and the matching items appear on the next `bun run gen`.
 * Each carries the complete light + dark color token set and REPLACES `:root` / `.dark` on install
 * (shadcn-style). `radius` is not included. They are never part of `all` / `edmi`.
 */
export const items: Item[] = listBases().flatMap((base) =>
	listThemes().map((theme): Item => {
		const cssVars = themeItemCssVars(base, theme);
		const label = `${cap(base)} · ${cap(theme)}`;
		return {
			name: themeItemName(base, theme),
			title: `Edmi theme ${label}`,
			description: `Edmi color tokens for base ${base} with the ${theme} accent (light + dark). Replaces the :root and .dark variables.`,
			type: "registry:theme",
			categories: ["Themes"],
			docs: "Run after `@edmi/theme`; it replaces the color variables in your global CSS (radius is left alone).",
			frameworks: {
				react: { cssVars },
				vue: { cssVars },
				svelte: { cssVars },
			},
		};
	}),
);

import { readdirSync, readFileSync } from "node:fs";

/** Shape of `cssVars` in a shadcn registry item. Keys have no leading `--`. */
export type CssVars = {
	theme: Record<string, string>;
	light: Record<string, string>;
	dark: Record<string, string>;
};

const DECL = /--([\w-]+)\s*:\s*([^;]+);/g;

function stripComments(css: string): string {
	return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Body of the first top-level block whose selector equals `selector`. */
function blockBody(css: string, selector: string): string {
	const start = css.search(
		new RegExp(
			`(^|[}\\s])${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{`,
		),
	);
	if (start < 0) return "";
	const open = css.indexOf("{", start);
	let depth = 0;
	for (let i = open; i < css.length; i++) {
		if (css[i] === "{") depth++;
		else if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
	}
	return "";
}

function declarations(body: string): Record<string, string> {
	const out: Record<string, string> = {};
	for (const m of body.matchAll(DECL))
		out[m[1] as string] = (m[2] as string).trim();
	return out;
}

/**
 * Parse tokens.css (`:root` = light, `.dark` = dark) into shadcn `cssVars`.
 * Variables that are identical in both modes and are not colors (e.g. `radius`)
 * move to `theme`. Pass theme.css as `themeCss` to also add its `--font-*` vars to `theme`.
 */
export function parseTokensCss(css: string, themeCss?: string): CssVars {
	const clean = stripComments(css);
	const light = declarations(blockBody(clean, ":root"));
	const dark = declarations(blockBody(clean, ".dark"));
	const theme: Record<string, string> = {};

	if (themeCss) {
		const fonts = declarations(
			blockBody(stripComments(themeCss), "@theme inline"),
		);
		for (const [k, v] of Object.entries(fonts))
			if (k.startsWith("font-")) theme[k] = v;
	}
	for (const [k, v] of Object.entries(light)) {
		if (dark[k] === v && !/^(oklch|rgba?|hsla?|#|transparent)/.test(v)) {
			theme[k] = v;
			delete light[k];
			delete dark[k];
		}
	}
	return { theme, light, dark };
}

/** Read the bundled tokens.css + theme.css from disk and parse them. */
export function getCssVars(): CssVars {
	return parseTokensCss(read("tokens.css"), read("theme.css"));
}

const read = (f: string) =>
	readFileSync(new URL(`./${f}`, import.meta.url), "utf8");

/** Names of the CSS files in `src/<dir>/`, sorted (`slate.css` -> `slate`). */
function listCss(dir: string): string[] {
	return readdirSync(new URL(`./${dir}/`, import.meta.url))
		.filter((f) => f.endsWith(".css"))
		.map((f) => f.slice(0, -4))
		.sort();
}

/** Base colors: the default (`stone`, in tokens.css) plus every file in `src/base/`. */
export const listBases = (): string[] => [
	...new Set(["stone", ...listCss("base")]),
];

/** Accent themes: the default (`green`, in tokens.css) plus every file in `src/themes/`. */
export const listThemes = (): string[] => [
	...new Set(["green", ...listCss("themes")]),
];

export const DEFAULT_BASE = "stone";
export const DEFAULT_THEME = "green";

export type ModeVars = {
	light: Record<string, string>;
	dark: Record<string, string>;
};

/**
 * Complete token sets (every var, `radius` included) for one base x theme pair:
 * tokens.css, then `base/<base>.css`, then `themes/<theme>.css` (the theme wins over the base for `primary`).
 * This mirrors what the browser computes for `<html data-base data-theme>` and `.dark` on top of it.
 */
export function composeCssVars(base: string, theme: string): ModeVars {
	const tokens = stripComments(read("tokens.css"));
	const light = declarations(blockBody(tokens, ":root"));
	const dark = declarations(blockBody(tokens, ".dark"));
	const layers: [string, string, string][] = [];
	if (base !== DEFAULT_BASE) layers.push([`base/${base}.css`, "base", base]);
	if (theme !== DEFAULT_THEME)
		layers.push([`themes/${theme}.css`, "theme", theme]);
	for (const [file, attr, name] of layers) {
		const css = stripComments(read(file));
		Object.assign(
			light,
			declarations(blockBody(css, `[data-${attr}="${name}"]`)),
		);
		Object.assign(
			dark,
			declarations(blockBody(css, `.dark[data-${attr}="${name}"]`)),
		);
	}
	return { light, dark };
}

/**
 * `cssVars` for a `registry:theme` item replacing the color tokens for `base` x `theme`.
 * `radius` is left out so installing a theme never resets the app's own radius.
 */
export function themeItemCssVars(base: string, theme: string): ModeVars {
	const { light, dark } = composeCssVars(base, theme);
	delete light.radius;
	delete dark.radius;
	return { light, dark };
}

/** Same structure shadcn's "Copy code" gives: `:root` (light + radius) then `.dark`. */
export function themeToCss(vars: ModeVars, radius = "0.625rem"): string {
	const block = (sel: string, v: Record<string, string>) =>
		`${sel} {\n${Object.entries(v)
			.map(([k, val]) => `  --${k}: ${val};`)
			.join("\n")}\n}`;
	return `${block(":root", { radius, ...omitRadius(vars.light) })}\n\n${block(".dark", omitRadius(vars.dark))}\n`;
}

function omitRadius(v: Record<string, string>): Record<string, string> {
	const { radius: _r, ...rest } = v;
	return rest;
}

/**
 * Explicit rules for the default base (`stone`) and theme (`green`), so a nested scope can switch back
 * to the defaults: `<div data-base="stone" data-theme="green">` inside `data-base="slate" data-theme="ocean"`.
 * The values come from tokens.css; the variable set is every variable that any other base / theme overrides.
 * Written to `src/base/stone.css` and `src/themes/green.css` by `scripts/gen-default-scopes.ts`.
 */
export function defaultScopeCss(kind: "base" | "theme"): string {
	const attr = kind;
	const name = kind === "base" ? DEFAULT_BASE : DEFAULT_THEME;
	const dir = kind === "base" ? "base" : "themes";
	const tokens = stripComments(read("tokens.css"));
	const full = {
		light: declarations(blockBody(tokens, ":root")),
		dark: declarations(blockBody(tokens, ".dark")),
	};
	const keysOf = (d: string, a: string, skip: string): Set<string> => {
		const out = new Set<string>();
		for (const other of listCss(d)) {
			if (other === skip) continue;
			const css = stripComments(read(`${d}/${other}.css`));
			for (const sel of [
				`[data-${a}="${other}"]`,
				`.dark[data-${a}="${other}"]`,
			])
				for (const k of Object.keys(declarations(blockBody(css, sel))))
					out.add(k);
		}
		return out;
	};
	const keys = keysOf(dir, attr, name);
	// A theme never re-declares what a base owns (primary ink, ...): `data-base="slate" data-theme="green"`
	// must keep slate's primary, exactly like composeCssVars does.
	if (kind === "theme")
		for (const k of keysOf("base", "base", DEFAULT_BASE)) keys.delete(k);
	const block = (sel: string, vars: Record<string, string>) =>
		`${sel} {\n${[...keys]
			.filter((k) => vars[k] !== undefined)
			.sort(
				(a, b) => Object.keys(vars).indexOf(a) - Object.keys(vars).indexOf(b),
			)
			.map((k) => `  --${k}: ${vars[k]};`)
			.join("\n")}\n}`;
	const what =
		kind === "base"
			? 'Base color = neutrals (surfaces, text, borders, lips, neutral "ink" primary).'
			: "Theme = accent (brand, ring, charts); `primary` stays with the base.";
	return `/* GENERATED by scripts/gen-default-scopes.ts from tokens.css. Do not edit.
   Edmi UI ${kind} "${name}" (the default): the same values tokens.css already applies to :root / .dark, written out
   explicitly so a nested scope can switch back to the default. ${what}
   Use: <div data-${attr}="${name}">. Load ${kind === "base" ? "after tokens.css and before themes/*" : "after tokens.css and base/*"}. */

${block(`[data-${attr}="${name}"]`, full.light)}

${block(`.dark[data-${attr}="${name}"]`, full.dark)}
`;
}

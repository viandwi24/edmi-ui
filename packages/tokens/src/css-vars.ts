import { readFileSync } from "node:fs";

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
	const read = (f: string) =>
		readFileSync(new URL(`./${f}`, import.meta.url), "utf8");
	return parseTokensCss(read("tokens.css"), read("theme.css"));
}

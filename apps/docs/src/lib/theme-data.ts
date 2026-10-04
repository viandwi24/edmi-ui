import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { ThemeData } from "../components/themes/ThemeCustomizer";

// css-vars.ts reads the base/theme CSS files relative to import.meta.url, which breaks when bundled,
// so load it natively at runtime (same reason as manifest.ts).
export async function loadThemeData(): Promise<ThemeData> {
	const m = await import(
		/* @vite-ignore */ pathToFileURL(
			resolve(process.cwd(), "../../packages/tokens/src/css-vars.ts"),
		).href
	);
	const bases: string[] = m.listBases();
	const themes: string[] = m.listThemes();
	return {
		bases,
		themes,
		swatch: {
			themes: Object.fromEntries(
				themes.map((t) => [t, m.composeCssVars("stone", t).light.brand]),
			),
			bases: Object.fromEntries(
				bases.map((b) => {
					const v = m.composeCssVars(b, "green").light;
					return [b, { bg: v.background, ink: v.primary }];
				}),
			),
		},
		vars: Object.fromEntries(
			bases.flatMap((b) =>
				themes.map((t) => [`${b}/${t}`, m.composeCssVars(b, t)]),
			),
		),
		css: Object.fromEntries(
			bases.flatMap((b) =>
				themes.map((t) => [
					`${b}/${t}`,
					m.themeToCss(m.themeItemCssVars(b, t)),
				]),
			),
		),
	};
}

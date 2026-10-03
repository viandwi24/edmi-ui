import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
	composeCssVars,
	defaultScopeCss,
	getCssVars,
	listBases,
	listThemes,
	parseTokensCss,
	themeItemCssVars,
	themeToCss,
} from "./css-vars.ts";

const shadcn = [
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"border",
	"input",
	"ring",
	"chart-1",
	"chart-2",
	"chart-3",
	"chart-4",
	"chart-5",
	"sidebar",
	"sidebar-foreground",
	"sidebar-primary",
	"sidebar-primary-foreground",
	"sidebar-accent",
	"sidebar-accent-foreground",
	"sidebar-border",
	"sidebar-ring",
];

// DESIGN.md §3 extras, expanded only for tokens present in tokens.css.
const extras = [
	"brand",
	"brand-foreground",
	"brand-hi",
	"brand-edge",
	"brand-lip",
	"brand-soft",
	"brand-text",
	"success",
	"success-soft",
	"success-text",
	"outline-hi",
	"outline-face",
	"outline-lip",
	"warning",
	"info",
	"warning-soft",
	"warning-text",
	"info-soft",
	"info-text",
	"destructive-foreground",
	"destructive-hi",
	"destructive-edge",
	"destructive-lip",
	"destructive-soft",
	"destructive-text",
	"primary-hi",
	"primary-edge",
	"primary-inset",
	"primary-shade",
	"primary-lip",
	"secondary-hi",
	"secondary-inset",
	"secondary-inset-b",
	"secondary-lip",
	"lip",
	"lip-strong",
	"card-hi",
	"foreground-2",
	"muted-foreground-2",
	"border-2",
	"tab-active",
	"ring-soft",
	"overlay",
];

describe("parseTokensCss", () => {
	const vars = getCssVars();

	test("every shadcn + extra token is in light and dark", () => {
		for (const name of [...shadcn, ...extras]) {
			expect(vars.light[name], `light ${name}`).toBeDefined();
			expect(vars.dark[name], `dark ${name}`).toBeDefined();
		}
	});

	test("radius and fonts go to theme, keys have no leading --", () => {
		expect(vars.theme.radius).toBe("0.625rem");
		expect(vars.theme["font-sans"]).toContain("Instrument Sans");
		expect(vars.theme["font-mono"]).toContain("JetBrains Mono");
		expect(vars.light.radius).toBeUndefined();
		for (const group of Object.values(vars))
			for (const k of Object.keys(group)) expect(k.startsWith("-")).toBe(false);
	});

	test("light and dark define the same set of names", () => {
		expect(Object.keys(vars.dark).sort()).toEqual(
			Object.keys(vars.light).sort(),
		);
	});

	test("parses a minimal sheet", () => {
		const out = parseTokensCss(
			"/* c */ :root { --radius: 1rem; --a: oklch(1 0 0); } .dark { --radius: 1rem; --a: rgba(0,0,0,.5); }",
		);
		expect(out).toEqual({
			theme: { radius: "1rem" },
			light: { a: "oklch(1 0 0)" },
			dark: { a: "rgba(0,0,0,.5)" },
		});
	});
});

describe("base x theme composition", () => {
	test("auto-discovers bases and themes next to the defaults", () => {
		expect(listBases()).toEqual(expect.arrayContaining(["stone", "slate"]));
		expect(listThemes()).toEqual(expect.arrayContaining(["green", "ocean"]));
	});

	test("stone x green is tokens.css untouched", () => {
		const v = composeCssVars("stone", "green");
		const t = getCssVars();
		expect(v.light.background).toBe(t.light.background);
		expect(v.dark.primary).toBe(t.dark.primary);
	});

	test("base replaces neutrals, theme wins for primary, status colors never change", () => {
		const stone = composeCssVars("stone", "green");
		const slate = composeCssVars("slate", "green");
		const ocean = composeCssVars("slate", "ocean");
		expect(slate.light.background).not.toBe(stone.light.background);
		expect(slate.light.primary).not.toBe(stone.light.primary);
		expect(ocean.light.primary).toBe("oklch(0.569 0.237 260.4)");
		expect(ocean.dark.brand).toBe("oklch(0.648 0.189 258.5)");
		expect(ocean.dark.background).toBe(slate.dark.background);
		for (const k of ["success", "success-text", "destructive", "warning"]) {
			expect(ocean.light[k]).toBe(stone.light[k]);
			expect(ocean.dark[k]).toBe(stone.dark[k]);
		}
	});

	test("every combination covers the same keys in light and dark", () => {
		const keys = Object.keys(composeCssVars("stone", "green").light).sort();
		for (const b of listBases())
			for (const t of listThemes()) {
				const v = composeCssVars(b, t);
				expect(Object.keys(v.light).sort()).toEqual(keys);
				expect(Object.keys(v.dark).sort()).toEqual(
					Object.keys(composeCssVars("stone", "green").dark).sort(),
				);
			}
	});

	test("theme item vars omit radius; themeToCss emits :root + .dark with radius", () => {
		const v = themeItemCssVars("slate", "ocean");
		expect(v.light.radius).toBeUndefined();
		const css = themeToCss(v, "0.75rem");
		expect(css).toStartWith(":root {\n  --radius: 0.75rem;");
		expect(css).toContain("\n.dark {\n");
		expect(css.match(/--primary:/g)?.length).toBe(2);
	});
});

describe("explicit default scopes", () => {
	const read = (f: string) =>
		readFileSync(new URL(`./${f}`, import.meta.url), "utf8");

	test("base/stone.css and themes/green.css are up to date (bun scripts/gen-default-scopes.ts)", () => {
		expect(read("base/stone.css")).toBe(defaultScopeCss("base"));
		expect(read("themes/green.css")).toBe(defaultScopeCss("theme"));
	});

	test("they carry the tokens.css values; green leaves primary to the base", () => {
		const t = getCssVars();
		const stone = read("base/stone.css");
		expect(stone).toContain('[data-base="stone"] {');
		expect(stone).toContain('.dark[data-base="stone"] {');
		expect(stone).toContain(`--primary: ${t.light.primary};`);
		expect(stone).toContain(`--primary: ${t.dark.primary};`);
		const green = read("themes/green.css");
		expect(green).toContain(`--brand: ${t.light.brand};`);
		expect(green).not.toContain("--primary:");
	});

	test("listBases / listThemes do not duplicate the defaults", () => {
		expect(new Set(listBases()).size).toBe(listBases().length);
		expect(new Set(listThemes()).size).toBe(listThemes().length);
	});
});

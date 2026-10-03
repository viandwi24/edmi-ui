import { describe, expect, test } from "bun:test";
import { getCssVars, parseTokensCss } from "./css-vars.ts";

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

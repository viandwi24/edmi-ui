import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { listBases, listThemes } from "../packages/tokens/src/css-vars.ts";
import { manifest as realManifest } from "../registry.manifest/index.ts";
import type { Item } from "../registry.manifest/types.ts";
import {
	buildFramework,
	generate,
	mapType,
	rewriteDependency,
	serialize,
} from "./lib/registry.ts";

const URL_ = "https://example.test";
const mk = (name: string, over: Partial<Item> = {}): Item => ({
	name,
	title: name,
	description: name,
	type: "registry:ui",
	categories: ["Actions"],
	frameworks: { react: {}, vue: {}, svelte: {} },
	...over,
});
const tmp = () => mkdtempSync(join(tmpdir(), "edmi-gen-"));
const opts = (root = tmp(), strict = false) => ({
	root,
	strict,
	edmiUrl: URL_,
});
const names = (r: { registry: Record<string, unknown> }) =>
	(r.registry.items as { name: string }[]).map((i) => i.name);
const item = (r: { registry: Record<string, unknown> }, n: string) =>
	(r.registry.items as Record<string, unknown>[]).find(
		(i) => i.name === n,
	) as Record<string, unknown>;

describe("registryDependencies rewrite", () => {
	test("helper", () => {
		expect(rewriteDependency("button", "react", URL_)).toBe("@edmi-ui/button");
		expect(rewriteDependency("button", "vue", URL_)).toBe("@edmi-ui/button");
		expect(rewriteDependency("button", "svelte", `${URL_}/`)).toBe(
			`${URL_}/r/svelte/button.json`,
		);
	});
	test("flat url layout (npm registry packages) drops the framework segment", () => {
		expect(rewriteDependency("button", "svelte", URL_, "flat")).toBe(
			`${URL_}/r/button.json`,
		);
		const m = [
			mk("button"),
			mk("dialog", { registryDependencies: ["button"] }),
		];
		const flat = { ...opts(), urlLayout: "flat" as const };
		expect(
			item(buildFramework(m, "svelte", flat), "dialog").registryDependencies,
		).toEqual([`${URL_}/r/button.json`]);
		const edmi = item(buildFramework(realManifest, "react", flat), "edmi");
		expect((edmi.config as { registries: unknown }).registries).toEqual({
			"@edmi-ui": `${URL_}/r/{name}.json`,
		});
	});
	test("per framework in output, sorted and deduped", () => {
		const m = [
			mk("button"),
			mk("card"),
			mk("dialog", { registryDependencies: ["card", "button", "card"] }),
		];
		const expected = {
			react: ["@edmi-ui/button", "@edmi-ui/card"],
			vue: ["@edmi-ui/button", "@edmi-ui/card"],
			svelte: [`${URL_}/r/svelte/button.json`, `${URL_}/r/svelte/card.json`],
		} as const;
		for (const fw of ["react", "vue", "svelte"] as const)
			expect(
				item(buildFramework(m, fw, opts()), "dialog").registryDependencies,
			).toEqual([...expected[fw]]);
	});
});

describe("skip handling", () => {
	const m = [
		mk("button"),
		mk("chart", { frameworks: { react: {}, vue: {}, svelte: { skip: true } } }),
		mk("uses-chart", { registryDependencies: ["chart"] }),
		mk("only-react", { frameworks: { react: {} } }),
	];
	test("skipped items are omitted for that framework only", () => {
		expect(names(buildFramework(m, "svelte", opts()))).not.toContain("chart");
		expect(names(buildFramework(m, "vue", opts()))).toContain("chart");
		expect(names(buildFramework(m, "vue", opts()))).not.toContain("only-react");
	});
	test("depending on a skipped item is an error", () => {
		const r = buildFramework(m, "svelte", opts());
		expect(r.errors.join("\n")).toMatch(
			/uses-chart.*"chart" is not available for svelte/,
		);
		expect(buildFramework(m, "react", opts()).errors).toEqual([]);
	});
	test("aggregate `all` excludes skipped items", () => {
		const all = mk("all", {
			type: "registry:block",
			aggregate: "ui",
			frameworks: { react: {}, svelte: {} },
		});
		const list = [
			mk("a"),
			mk("b", { frameworks: { react: {}, svelte: { skip: true } } }),
			all,
		];
		expect(
			item(buildFramework(list, "react", opts()), "all").registryDependencies,
		).toEqual(["@edmi-ui/a", "@edmi-ui/b"]);
		expect(
			item(buildFramework(list, "svelte", opts()), "all").registryDependencies,
		).toEqual([`${URL_}/r/svelte/a.json`]);
	});
	test("aggregate `patterns` collects the Patterns category only", () => {
		const pats = mk("patterns", {
			type: "registry:block",
			aggregate: "patterns",
			frameworks: { react: {}, svelte: {} },
		});
		const list = [
			mk("a"),
			mk("p1", { type: "registry:block", categories: ["Patterns"] }),
			mk("p2", {
				type: "registry:block",
				categories: ["Patterns"],
				frameworks: { react: {}, svelte: { skip: true } },
			}),
			pats,
		];
		expect(
			item(buildFramework(list, "react", opts()), "patterns")
				.registryDependencies,
		).toEqual(["@edmi-ui/p1", "@edmi-ui/p2"]);
		expect(
			item(buildFramework(list, "svelte", opts()), "patterns")
				.registryDependencies,
		).toEqual([`${URL_}/r/svelte/p1.json`]);
	});
	test("aggregate `ai` collects AI items; `ui` excludes them", () => {
		const aiAll = mk("ai-all", {
			type: "registry:block",
			categories: ["Meta"],
			aggregate: "ai",
		});
		const all = mk("all", {
			type: "registry:block",
			categories: ["Meta"],
			aggregate: "ui",
		});
		const list = [
			mk("button"),
			mk("ai-message", {
				type: "registry:component",
				categories: ["AI · Chat"],
				frameworks: { react: {}, svelte: { skip: true } },
			}),
			mk("ai-tool", {
				type: "registry:ui",
				categories: ["AI · Agent"],
			}),
			aiAll,
			all,
		];
		expect(
			item(buildFramework(list, "react", opts()), "ai-all")
				.registryDependencies,
		).toEqual(["@edmi-ui/ai-message", "@edmi-ui/ai-tool"]);
		expect(
			item(buildFramework(list, "svelte", opts()), "ai-all")
				.registryDependencies,
		).toEqual([`${URL_}/r/svelte/ai-tool.json`]);
		expect(
			item(buildFramework(list, "react", opts()), "all").registryDependencies,
		).toEqual(["@edmi-ui/button"]);
	});
	test("real manifest: AI items are named ai-*, never in `all`, shipped via `ai-all`", () => {
		const react = buildFramework(realManifest, "react", opts());
		const all = item(react, "all").registryDependencies as string[];
		expect(all.some((d) => d.startsWith("@edmi-ui/ai-"))).toBe(false);
		const aiAll = item(react, "ai-all").registryDependencies as string[];
		expect(aiAll).toContain("@edmi-ui/ai-message");
		for (const i of realManifest)
			if (i.categories.some((c) => c.startsWith("AI · ")))
				expect(i.name.startsWith("ai-")).toBe(true);
	});
	test("optional dependencies only when present", () => {
		const x = mk("x", { optionalRegistryDependencies: ["utils", "nope"] });
		expect(
			item(buildFramework([x], "react", opts()), "x").registryDependencies,
		).toEqual([]);
		const withUtils = [x, mk("utils", { type: "registry:lib" })];
		expect(
			item(buildFramework(withUtils, "react", opts()), "x")
				.registryDependencies,
		).toEqual(["@edmi-ui/utils"]);
	});
});

describe("type mapping", () => {
	test("mapType", () => {
		expect(mapType("registry:base", "react")).toBe("registry:base");
		expect(mapType("registry:base", "vue")).toBe("registry:block");
		expect(mapType("registry:base", "svelte")).toBe("registry:style");
		expect(mapType("registry:theme", "svelte")).toBe("registry:theme");
	});
	test("edmi: base config only on React; fonts only on React", () => {
		const react = buildFramework(realManifest, "react", opts());
		const vue = buildFramework(realManifest, "vue", opts());
		const svelte = buildFramework(realManifest, "svelte", opts());
		expect(item(react, "edmi").type).toBe("registry:base");
		expect(item(react, "edmi").config).toEqual({
			style: "base-nova",
			iconLibrary: "phosphor",
			tailwind: { baseColor: "neutral" },
			registries: { "@edmi-ui": "https://example.test/r/react/{name}.json" },
		});
		expect(item(react, "edmi").extends).toBe("none");
		expect(item(vue, "edmi").extends).toBeUndefined();
		expect(item(react, "edmi").registryDependencies).toEqual(
			expect.arrayContaining([
				"@edmi-ui/font-instrument-sans",
				"@edmi-ui/font-jetbrains-mono",
				"@edmi-ui/theme",
				"@edmi-ui/button",
			]),
		);
		expect(item(vue, "edmi").type).toBe("registry:block");
		expect(item(vue, "edmi").config).toBeUndefined();
		expect(item(svelte, "edmi").type).toBe("registry:style");
		expect(names(react)).toContain("font-instrument-sans");
		expect(names(vue)).not.toContain("font-instrument-sans");
		expect(names(svelte)).not.toContain("font-jetbrains-mono");
		expect(JSON.stringify(item(vue, "theme").css)).toContain(
			'@import \\"@fontsource-variable/instrument-sans\\"',
		);
		expect(JSON.stringify(item(vue, "theme").css)).not.toContain(
			"@import url(",
		);
		expect(item(vue, "theme").dependencies).toContain(
			"@fontsource-variable/sora",
		);
		expect(names(react)).toContain("font-sora");
		expect(JSON.stringify(item(react, "theme").css)).not.toContain("@import");
		expect(item(react, "font-sans" as string)).toBeUndefined();
	});
	test("svelte items carry docs/categories in meta (strict schema)", () => {
		const m = [mk("button", { docs: "d", categories: ["Actions"] })];
		const s = item(buildFramework(m, "svelte", opts()), "button");
		expect(s.docs).toBeUndefined();
		expect(s.categories).toBeUndefined();
		expect(s.meta).toEqual({ docs: "d", categories: ["Actions"] });
		const r = item(buildFramework(m, "react", opts()), "button");
		expect(r.docs).toBe("d");
		expect(r.categories).toEqual(["Actions"]);
	});
	test("per-framework type override and passthrough", () => {
		const m = [
			mk("blk", {
				frameworks: {
					react: {},
					vue: {
						type: "registry:block",
						envVars: { A: "1" },
						cssVars: { light: { a: "b" } },
					},
				},
			}),
		];
		expect(item(buildFramework(m, "react", opts()), "blk").type).toBe(
			"registry:ui",
		);
		const v = item(buildFramework(m, "vue", opts()), "blk");
		expect(v.type).toBe("registry:block");
		expect(v.envVars).toEqual({ A: "1" });
		expect(v.cssVars).toEqual({ light: { a: "b" } });
	});
});

describe("validation", () => {
	test("unknown registryDependency is an error", () => {
		const r = buildFramework(
			[mk("a", { registryDependencies: ["ghost"] })],
			"react",
			opts(),
		);
		expect(r.errors).toEqual(['[react] a: unknown registryDependency "ghost"']);
	});
	test("missing file: warning by default, error when strict", () => {
		const m = [
			mk("a", {
				frameworks: { react: { files: [{ path: "registry/ui/a.tsx" }] } },
			}),
		];
		const lax = buildFramework(m, "react", opts());
		expect(lax.errors).toEqual([]);
		expect(lax.warnings[0]).toMatch(
			/file not found: packages\/react\/registry\/ui\/a\.tsx/,
		);
		const strict = buildFramework(m, "react", opts(tmp(), true));
		expect(strict.errors[0]).toMatch(/file not found/);
	});
	test("existing file passes strict and defaults file type", () => {
		const root = tmp();
		mkdirSync(join(root, "packages/react/registry/ui"), { recursive: true });
		writeFileSync(join(root, "packages/react/registry/ui/a.tsx"), "");
		const m = [
			mk("a", {
				frameworks: { react: { files: [{ path: "./registry/ui/a.tsx" }] } },
			}),
		];
		const r = buildFramework(m, "react", opts(root, true));
		expect(r.errors).toEqual([]);
		expect(item(r, "a").files).toEqual([
			{ path: "registry/ui/a.tsx", type: "registry:ui" },
		]);
	});
	test("generate reports duplicates and refuses to write on error", () => {
		const out = tmp();
		const s = generate([mk("a"), mk("a")], { ...opts(), outDir: out });
		expect(s.errors).toContain('duplicate item name "a"');
		expect(s.written).toEqual([]);
	});
});

describe("theme items (base x accent)", () => {
	const bases = listBases();
	const accents = listThemes();
	test("one registry:theme item per combination in every framework", () => {
		for (const fw of ["react", "vue", "svelte"] as const) {
			const r = buildFramework(realManifest, fw, opts());
			for (const b of bases)
				for (const a of accents) {
					const it = item(r, `theme-${b}-${a}`);
					expect(it, `${fw} theme-${b}-${a}`).toBeDefined();
					expect(it.type).toBe("registry:theme");
					expect(it.registryDependencies).toEqual([]);
					const cv = it.cssVars as {
						light: Record<string, string>;
						dark: Record<string, string>;
					};
					expect(cv.light.primary).toBeDefined();
					expect(cv.dark.primary).toBeDefined();
					expect(cv.light.radius).toBeUndefined();
				}
		}
	});
	test("slate-ocean replaces neutrals and accent; never part of all/edmi", () => {
		const r = buildFramework(realManifest, "react", opts());
		const cv = item(r, "theme-slate-ocean").cssVars as {
			light: Record<string, string>;
			dark: Record<string, string>;
		};
		expect(cv.light.primary).toBe("oklch(0.569 0.237 260.4)");
		expect(cv.dark.primary).toBe("oklch(0.606 0.215 259.1)");
		expect(cv.light.background).toBe("oklch(0.976 0.006 264.5)");
		for (const n of ["all", "edmi"])
			expect(
				(item(r, n).registryDependencies as string[]).some((d) =>
					d.includes("theme-"),
				),
			).toBe(false);
	});
});

describe("generate", () => {
	test("skips frameworks without packages dir; --out writes all", () => {
		const root = tmp();
		mkdirSync(join(root, "packages/vue"), { recursive: true });
		const s = generate([mk("a")], { root, edmiUrl: URL_ });
		expect(s.skipped).toEqual(["react", "svelte"]);
		expect(s.written).toEqual([join(root, "packages/vue/registry.json")]);
		const out = tmp();
		const s2 = generate([mk("a")], { root, outDir: out, edmiUrl: URL_ });
		expect(s2.written.length).toBe(3);
		const json = JSON.parse(
			readFileSync(join(out, "svelte/registry.json"), "utf8"),
		);
		expect(json.$schema).toBe("https://shadcn-svelte.com/schema/registry.json");
		expect(json.name).toBe("edmi");
		expect(json.homepage).toBe(URL_);
	});
	test("deterministic: input order does not change output, trailing newline", () => {
		const a = [mk("b"), mk("a"), mk("c", { registryDependencies: ["b", "a"] })];
		const b = [...a].reverse();
		for (const fw of ["react", "vue", "svelte"] as const) {
			const x = serialize(buildFramework(a, fw, opts()).registry);
			expect(serialize(buildFramework(b, fw, opts()).registry)).toBe(x);
			expect(x.endsWith("}\n")).toBe(true);
			expect(x).toContain('\n  "items"');
		}
	});
	test("real manifest builds without errors", () => {
		for (const fw of ["react", "vue", "svelte"] as const)
			expect(buildFramework(realManifest, fw, opts()).errors).toEqual([]);
	});
});

// Every `@lucide/vue` import in the Vue registry (and docs demos) must resolve in shadcn-vue's icon map
// (https://www.shadcn-vue.com/r/icons/index.json), exactly like the CLI's transform-icons does:
// `map[name] ?? map[name.replace(/Icon$/, "")]`. The entry must map phosphor (Edmi's default) and lucide;
// other libraries missing a mapping are only warned about. Unresolved names make the CLI leave the lucide
// name imported from the consumer's icon package and typecheck breaks (e.g. `ChartLine` has no key, `ChartLineIcon` has).
// Usage: bun scripts/smoke/vue-icons.ts [icons.json path]   (fetches the map when no path is given)
import { Glob } from "bun";

const ROOT = new URL("../..", import.meta.url).pathname;
const src = process.argv[2];
const map: Record<string, Record<string, string>> = src
	? await Bun.file(src).json()
	: await (await fetch("https://www.shadcn-vue.com/r/icons/index.json")).json();
const libs = [
	"lucide",
	"radix",
	"tabler",
	"phosphor",
	"remixicon",
	"hugeicons",
];

const bad: string[] = [];
const warn = new Set<string>();
for (const dir of [
	"packages/vue/registry",
	"apps/docs/src/demos/vue",
	"packages/vue/src",
]) {
	for await (const f of new Glob("**/*.{vue,ts}").scan({ cwd: ROOT + dir })) {
		const text = await Bun.file(`${ROOT}${dir}/${f}`).text();
		for (const m of text.matchAll(
			/import\s*\{([^}]*)\}\s*from\s*["']@lucide\/vue["']/g,
		)) {
			for (const part of (m[1] ?? "").split(",")) {
				const name = part.trim().split(/\s+as\s+/)[0];
				if (!name) continue;
				const e = map[name] ?? map[name.replace(/Icon$/, "")];
				if (!e) {
					bad.push(`${dir}/${f}: ${name} (not in icon map)`);
					continue;
				}
				const missing = libs.filter((l) => !e[l]);
				if (missing.some((l) => l === "phosphor" || l === "lucide"))
					bad.push(`${dir}/${f}: ${name} (no ${missing.join("/")})`);
				else if (missing.length) warn.add(`${name} (no ${missing.join("/")})`);
			}
		}
	}
}
if (bad.length) {
	console.error(`unmapped lucide icons:\n${bad.join("\n")}`);
	process.exit(1);
}
if (warn.size)
	console.warn(`note, not every library maps: ${[...warn].join(", ")}`);
console.log(
	"vue-icons: all @lucide/vue imports are in the shadcn-vue icon map",
);

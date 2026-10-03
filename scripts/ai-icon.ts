/**
 * Prints the five-prop `<IconPlaceholder />` snippet (React / Svelte registry sources) for a lucide icon name:
 *   bun run scripts/ai-icon.ts ArrowUpIcon [className]
 * Looks the name up in the shadcn icon index (https://ui.shadcn.com/r/icons/index.json) merged with the
 * IconPlaceholder usages already in this repo's React registry. Verify the `phosphor` name exists in
 * `@phosphor-icons/react` (a missing one renders nothing). Vue does NOT use IconPlaceholder: import from
 * `@lucide/vue` and keep to names in https://www.shadcn-vue.com/r/icons/index.json (see AGENTS.md section 6).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const LIBS = [
	"lucide",
	"tabler",
	"hugeicons",
	"phosphor",
	"remixicon",
] as const;
type Entry = Record<(typeof LIBS)[number], string>;

const map = new Map<string, Entry>();
const add = (e: Partial<Entry>) => {
	if (LIBS.every((l) => e[l])) map.set(e.lucide as string, e as Entry);
};

const index = (await (
	await fetch("https://ui.shadcn.com/r/icons/index.json")
).json()) as Record<string, Partial<Entry>>;
for (const e of Object.values(index)) add(e);

const root = resolve(import.meta.dir, "../packages/react/registry");
const walk = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
		d.isDirectory()
			? walk(join(dir, d.name))
			: d.name.endsWith(".tsx")
				? [join(dir, d.name)]
				: [],
	);
for (const file of walk(root))
	for (const m of readFileSync(file, "utf8").matchAll(
		/<IconPlaceholder\b([\s\S]*?)\/>/g,
	))
		add(
			Object.fromEntries(
				[...(m[1] ?? "").matchAll(/(\w+)="([^"]*)"/g)].map((a) => [a[1], a[2]]),
			),
		);

const [name, className] = process.argv.slice(2);
if (!name) {
	console.error("usage: bun run scripts/ai-icon.ts <LucideName> [className]");
	process.exit(1);
}
const hit = [name, `${name}Icon`, name.replace(/Icon$/, "")]
	.map((n) => map.get(n))
	.find(Boolean);
if (!hit) {
	console.error(
		`not found: ${name} (find the name in each icon library by hand)`,
	);
	process.exit(1);
}
const attrs = LIBS.map((l) => `${l}="${hit[l]}"`).join(" ");
console.log(
	`<IconPlaceholder ${attrs}${className ? ` className="${className}"` : ""} />`,
);

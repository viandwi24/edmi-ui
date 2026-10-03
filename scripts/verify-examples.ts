/**
 * Verifies the docs Examples (apps/docs/src/examples/index.ts): every listed slug has data.ts, the
 * three framework sources, light + dark thumbnails and a render route in the built site (when
 * apps/docs/dist exists); every folder under src/examples is listed; sources import only registry
 * aliases (no packages/* paths, no relative CSS). Exit 1 on any gap.
 *   bun run scripts/verify-examples.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { EXAMPLE_FILE, EXAMPLES } from "../apps/docs/src/examples/index.ts";

if (process.argv.includes("--markdown")) process.exit(0); // `verify:matrix --markdown` prints the matrix table only

const ROOT = resolve(import.meta.dir, "..");
const DOCS = resolve(ROOT, "apps/docs");
const DIR = resolve(DOCS, "src/examples");
const FWS = ["react", "vue", "svelte"] as const;

const problems: string[] = [];
const bad = (m: string) => problems.push(m);

for (const e of EXAMPLES) {
	const base = resolve(DIR, e.slug);
	if (!existsSync(resolve(base, "data.ts"))) bad(`${e.slug}: missing data.ts`);
	for (const fw of FWS) {
		if (!e.frameworks.includes(fw))
			bad(`${e.slug}: frameworks must list ${fw} (all three are required)`);
		const file = resolve(base, EXAMPLE_FILE[fw]);
		if (!existsSync(file)) {
			bad(`${e.slug}: missing ${EXAMPLE_FILE[fw]}`);
			continue;
		}
		const src = readFileSync(file, "utf8");
		if (!/from\s+["']\.\/data["']/.test(src))
			bad(
				`${e.slug}/${EXAMPLE_FILE[fw]}: does not import ./data (sample data must be shared)`,
			);
		for (const m of src.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)) {
			const spec = m[1] ?? "";
			if (
				/packages\//.test(spec) ||
				/^\.\.\//.test(spec) ||
				/\.css$/.test(spec)
			)
				bad(
					`${e.slug}/${EXAMPLE_FILE[fw]}: forbidden import "${spec}" (registry aliases only)`,
				);
		}
		if (/<style[\s>]/.test(src))
			bad(
				`${e.slug}/${EXAMPLE_FILE[fw]}: <style> block (tokens/recipes + Tailwind utilities only)`,
			);
	}
	for (const mode of ["light", "dark"]) {
		if (!existsSync(resolve(DOCS, `public/examples/${e.thumb}-${mode}.png`)))
			bad(`${e.slug}: missing public/examples/${e.thumb}-${mode}.png`);
	}
	const dist = resolve(DOCS, "dist/examples");
	if (existsSync(dist)) {
		if (!existsSync(resolve(dist, e.slug, "index.html")))
			bad(`${e.slug}: no built page (run the docs build)`);
		for (const fw of FWS)
			if (!existsSync(resolve(dist, e.slug, "render", fw, "index.html")))
				bad(`${e.slug}: no built render route for ${fw}`);
	}
}
const listed = new Set(EXAMPLES.map((e) => e.slug));
for (const d of readdirSync(DIR)) {
	if (statSync(resolve(DIR, d)).isDirectory() && !listed.has(d))
		bad(`src/examples/${d}: folder not listed in src/examples/index.ts`);
}
const dup = EXAMPLES.map((e) => e.slug).filter((s, i, a) => a.indexOf(s) !== i);
for (const s of dup) bad(`duplicate slug ${s}`);

console.log(
	`examples: ${EXAMPLES.length} listed (${EXAMPLES.map((e) => e.slug).join(", ")})`,
);
if (problems.length) {
	for (const p of problems) console.error(`  ✗ ${p}`);
	process.exit(1);
}
console.log(
	"examples: OK (data.ts + react/vue/svelte sources + thumbnails + render routes)",
);

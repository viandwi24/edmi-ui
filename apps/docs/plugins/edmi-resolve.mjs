// Resolves framework-internal import aliases for registry files and docs demos so the three
// frameworks (React/Vue/Svelte) do not collide on `@/…`.
//
// Importer under packages/<fw>/ :
//   @/registry/edmi/<rest>      -> packages/<fw>/registry/<rest>
//   @/<rest>                    -> packages/<fw>/src/<rest>  | packages/<fw>/registry/<rest>
//   $lib/registry/edmi/<rest>   -> packages/<fw>/registry/<rest> | packages/<fw>/src/lib/<rest>
//   $lib/<rest>                 -> packages/<fw>/src/lib/<rest>  | packages/<fw>/registry/<rest>
// Anywhere (demos):
//   @edmi-<fw>/<rest>           -> packages/<fw>/registry/<rest> | packages/<fw>/src/lib/registry/<rest>
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const EXTS = [
	"",
	".ts",
	".tsx",
	".js",
	".vue",
	".svelte",
	".svelte.ts",
	".json",
	".css",
];
const INDEX = [
	"index.ts",
	"index.tsx",
	"index.js",
	"index.vue",
	"index.svelte",
];

function tryFile(base) {
	// Svelte sources import "./x.js" for x.ts (TS convention): retry without the .js.
	if (base.endsWith(".js") && !existsSync(base)) {
		const alt = tryFile(base.slice(0, -3));
		if (alt) return alt;
	}
	for (const ext of EXTS) {
		const p = base + ext;
		if (existsSync(p) && statSync(p).isFile()) return p;
	}
	if (existsSync(base) && statSync(base).isDirectory()) {
		for (const i of INDEX) {
			const p = join(base, i);
			if (existsSync(p)) return p;
		}
	}
	return null;
}

export function edmiResolve(repoRoot) {
	const pkg = (fw) => resolve(repoRoot, "packages", fw);
	return {
		name: "edmi-resolve",
		enforce: "pre",
		resolveId(source, importer) {
			const clean = source.split("?")[0];
			const query = source.includes("?")
				? source.slice(source.indexOf("?"))
				: "";
			const m = clean.match(/^@edmi-(react|vue|svelte)\/(.+)$/);
			if (m) {
				const [, fw, rest] = m;
				const hit =
					tryFile(join(pkg(fw), "registry", rest)) ||
					tryFile(join(pkg(fw), "src/lib/registry", rest)) ||
					tryFile(join(pkg(fw), "src/lib", rest));
				return hit ? hit + query : null;
			}
			if (!importer) return null;
			const imp = importer.split("?")[0].replace(/\\/g, "/");
			// Registry sources, and Svelte demos that import `$lib/...` paths of the installed layout.
			const fwMatch =
				imp.match(/\/packages\/(react|vue|svelte)\//) ||
				imp.match(/\/apps\/docs\/src\/demos\/(svelte)\//) ||
				imp.match(/\/apps\/docs\/src\/examples\/.+\.(svelte)$/);
			if (!fwMatch) return null;
			const root = pkg(fwMatch[1]);
			const reg = (r) => [
				join(root, "registry", r),
				join(root, "src/lib/registry", r),
			];
			const rules = [
				[/^@\/registry\/edmi\/(.+)$/, reg],
				[/^\$lib\/registry\/edmi\/(.+)$/, reg],
				[
					/^\$lib\/(.+)$/,
					(r) => [
						join(root, "src/lib", r),
						join(root, "registry", r),
						join(root, "src/lib/registry", r),
					],
				],
				[/^@\/(.+)$/, (r) => [join(root, "src", r), join(root, "registry", r)]],
			];
			let cands = [];
			for (const [re, make] of rules) {
				const hit = clean.match(re);
				if (hit) {
					cands = make(hit[1]);
					break;
				}
			}
			for (const c of cands) {
				const hit = tryFile(c);
				if (hit) return hit + query;
			}
			return null;
		},
	};
}

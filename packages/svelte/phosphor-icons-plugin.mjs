// Dev/docs-only Vite plugin behind the IconPlaceholder shim (never shipped in the registry).
// Exposes `virtual:edmi-phosphor-icons`: `(name) => Promise<{ default: Component }> | undefined`
// with one lazy chunk per phosphor-svelte icon.
//  - build: a static map of dynamic imports (code-split per icon).
//  - dev:   a runtime `/@fs/` URL import. Nothing for Vite's dependency scan to crawl (an
//    `import.meta.glob` over 1500 icons made the scan fail and hydration 504).
import { readdirSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const ID = "virtual:edmi-phosphor-icons";
const RESOLVED = `\0${ID}`;

/** @returns {import("vite").Plugin} */
export function phosphorIcons() {
	let build = false;
	let lib = "";
	return {
		name: "edmi-phosphor-icons",
		enforce: "pre",
		configResolved(config) {
			build = config.command === "build";
			const pkg = createRequire(import.meta.url).resolve(
				"phosphor-svelte/package.json",
			);
			lib = join(realpathSync(dirname(pkg)), "lib");
		},
		resolveId(source) {
			return source === ID ? RESOLVED : null;
		},
		load(id) {
			if (id !== RESOLVED) return null;
			if (!build) {
				return `const base = ${JSON.stringify(`/@fs${lib}/`)};
export default (name) => import(/* @vite-ignore */ base + name + ".svelte");`;
			}
			const names = readdirSync(lib)
				.filter((f) => f.endsWith("Icon.svelte"))
				.map((f) => f.slice(0, -".svelte".length));
			const rows = names
				.map(
					(n) =>
						`\t${JSON.stringify(n)}: () => import(${JSON.stringify(`${lib}/${n}.svelte`)}),`,
				)
				.join("\n");
			return `const loaders = {\n${rows}\n};\nexport default (name) => loaders[name]?.();`;
		},
	};
}

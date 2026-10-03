// `vue-tsc` under Bun. vue-tsc patches TypeScript by intercepting fs.readFileSync() while it
// require()s tsc.js; Bun's module loader never calls fs.readFileSync, so the stock bin runs a
// plain tsc that cannot resolve `.vue` imports. This wrapper applies the same patch
// (volar's own transformTscContent) to a copy of tsc and runs that. Usage: node scripts/vue-tsc.mjs <tsc args>
// Under real Node the stock vue-tsc works, so this wrapper just delegates to it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const here = createRequire(import.meta.url);

if (typeof Bun === "undefined") {
	const bin = here.resolve("vue-tsc/bin/vue-tsc.js");
	process.argv.splice(1, 1, bin);
	await import(bin);
	process.exit(process.exitCode ?? 0);
}
const vueTscDir = dirname(here.resolve("vue-tsc/package.json"));
const fromVueTsc = createRequire(`${vueTscDir}/`);
const runTscPath = fromVueTsc.resolve(
	"@volar/typescript/lib/quickstart/runTsc",
);
const volar = fromVueTsc(runTscPath);
const core = fromVueTsc("@vue/language-core");
const tscShim = fromVueTsc.resolve("typescript/lib/tsc");
// TypeScript >= 5.7: tsc.js is a shim around _tsc.js.
const realTsc = join(dirname(tscShim), "_tsc.js");

const extensions = new Set([".vue"]);
volar.getLanguagePlugins = (ts, options) => {
	const { configFilePath } = options.options;
	const vueOptions =
		typeof configFilePath === "string"
			? core.createParsedCommandLine(
					ts,
					ts.sys,
					configFilePath.replace(/\\/g, "/"),
				).vueOptions
			: core.createParsedCommandLineByJson(ts, ts.sys, process.cwd(), {})
					.vueOptions;
	return {
		languagePlugins: [
			core.createVueLanguagePlugin(ts, options.options, vueOptions, (id) => id),
		],
	};
};

const patched = volar.transformTscContent(
	readFileSync(realTsc, "utf8"),
	fromVueTsc.resolve("@volar/typescript/lib/node/proxyCreateProgram"),
	[...extensions],
	[],
	runTscPath,
);
// Keep the patched copy beside the original so its relative requires and `__dirname` still work.
const out = join(dirname(realTsc), "_tsc.vue-patched.cjs");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, patched);
process.argv.splice(1, 1, tscShim);
here(out);

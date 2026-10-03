import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "../registry.manifest/index.ts";
import { DEFAULT_EDMI_URL, generate } from "./lib/registry.ts";

// Usage: bun run scripts/gen-registry.ts [--strict] [--out <dir>] [--url-layout framework|flat]
// Strict (or CI=true): missing manifest files are errors instead of warnings.
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outDir = outIdx >= 0 ? resolve(args[outIdx + 1] ?? "") : undefined;
if (outIdx >= 0 && !args[outIdx + 1]) {
	console.error("gen-registry: --out needs a directory");
	process.exit(2);
}
const strict =
	args.includes("--strict") ||
	process.env.CI === "true" ||
	process.env.CI === "1";
const layoutIdx = args.indexOf("--url-layout");
const urlLayout = layoutIdx >= 0 ? args[layoutIdx + 1] : "framework";
if (urlLayout !== "framework" && urlLayout !== "flat") {
	console.error("gen-registry: --url-layout must be framework or flat");
	process.exit(2);
}
const edmiUrl = process.env.EDMI_URL || DEFAULT_EDMI_URL;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

console.log(`gen-registry: EDMI_URL=${edmiUrl}${strict ? " (strict)" : ""}`);
const summary = generate(
	manifest,
	{ root, outDir, strict, edmiUrl, urlLayout },
	(m) => console.log(`gen-registry: ${m}`),
);
for (const w of summary.warnings) console.warn(`warning: ${w}`);
for (const e of summary.errors) console.error(`error: ${e}`);
if (summary.errors.length) process.exit(1);

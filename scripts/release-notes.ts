// Combined GitHub Release notes for one version of the fixed changeset group.
// Usage: bun run release:notes <version> <out-file>
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const PACKAGES = [
	{ name: "@edmi-ui/tokens", dir: "packages/tokens" },
	{
		name: "@edmi-ui/registry-react",
		dir: "packages/registry-react",
		fw: "react",
	},
	{ name: "@edmi-ui/registry-vue", dir: "packages/registry-vue", fw: "vue" },
	{
		name: "@edmi-ui/registry-svelte",
		dir: "packages/registry-svelte",
		fw: "svelte",
	},
] as const;

const PAGES = "https://viandwi24.github.io/edmi-ui";
const LEVELS = ["Major", "Minor", "Patch"] as const;
type Level = (typeof LEVELS)[number];

/** Bullets of one changelog `## <version>` section, grouped by `### <Level> Changes`. */
export function parseSection(
	changelog: string,
	version: string,
): Record<Level, string[]> {
	const out: Record<Level, string[]> = { Major: [], Minor: [], Patch: [] };
	const lines = changelog.split(/\r?\n/);
	let inSection = false;
	let level: Level | null = null;
	let current: string[] | null = null;
	const flush = () => {
		if (current && level) out[level].push(current.join("\n").trimEnd());
		current = null;
	};
	for (const line of lines) {
		if (/^## /.test(line)) {
			flush();
			inSection = line.slice(3).trim() === version;
			level = null;
			continue;
		}
		if (!inSection) continue;
		const h = /^### (Major|Minor|Patch) Changes/.exec(line);
		if (h) {
			flush();
			level = h[1] as Level;
			continue;
		}
		if (!level) continue;
		if (line.startsWith("- ")) {
			flush();
			current = [line.slice(2)];
		} else if (current && line.trim() !== "") {
			current.push(line);
		} else if (current && line.trim() === "") {
			flush();
		}
	}
	flush();
	return out;
}

/** Drop changesets' short commit hash prefix (`6e0ab1e: text`). Links are kept. */
export function stripHash(bullet: string): string {
	return bullet.replace(/^[0-9a-f]{7,40}: /, "");
}

export function buildNotes(
	version: string,
	changelogs: Record<string, string>,
): string {
	const merged: Record<Level, string[]> = { Major: [], Minor: [], Patch: [] };
	const seen = new Set<string>();
	for (const p of PACKAGES) {
		const sec = parseSection(changelogs[p.name] ?? "", version);
		for (const level of LEVELS) {
			for (const raw of sec[level]) {
				const b = stripHash(raw);
				if (seen.has(b)) continue;
				seen.add(b);
				merged[level].push(b);
			}
		}
	}
	const md: string[] = [];
	md.push(
		`Edmi UI \`${version}\`: all four packages are versioned together.`,
		"",
		"## Install",
		"",
		`Registries on GitHub Pages (latest): \`${PAGES}/r/<react|vue|svelte>/<name>.json\``,
		"",
		"Pinned to this version on jsDelivr:",
		"",
	);
	for (const p of PACKAGES) {
		if ("fw" in p) {
			md.push(
				`- ${p.name}@${version}: \`https://cdn.jsdelivr.net/npm/${p.name}@${version}/r/<name>.json\``,
			);
		} else {
			md.push(
				`- ${p.name}@${version}: design tokens (\`bun add ${p.name}@${version}\`)`,
			);
		}
	}
	md.push("");
	let any = false;
	for (const level of LEVELS) {
		if (merged[level].length === 0) continue;
		any = true;
		md.push(`## ${level} Changes`, "");
		for (const b of merged[level]) {
			md.push(`- ${b.replace(/\n/g, "\n  ")}`);
		}
		md.push("");
	}
	if (!any) md.push("No changelog entries found for this version.", "");
	return `${md.join("\n").trimEnd()}\n`;
}

if (import.meta.main) {
	const [version, outFile] = process.argv.slice(2);
	if (!version || !outFile) {
		console.error("Usage: bun run release:notes <version> <out-file>");
		process.exit(1);
	}
	const root = join(import.meta.dir, "..");
	const changelogs: Record<string, string> = {};
	for (const p of PACKAGES) {
		changelogs[p.name] = readFileSync(
			join(root, p.dir, "CHANGELOG.md"),
			"utf8",
		);
	}
	writeFileSync(outFile, buildNotes(version, changelogs));
	console.log(`Wrote ${outFile}`);
}

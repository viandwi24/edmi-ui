// Flat, always-expanded sidebar entries generated from the content folders and the examples list.
// New components appear without config edits: drop an mdx under src/content/docs/components/<dir>/.
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Directories under components/ that make up the "AI" section (everything else is "Components"). */
const isAiDir = (dir) => dir.startsWith("ai-");
/** Directories whose items are Edmi-only (marked with a small star in the sidebar). */
const EDMI_ONLY = new Set(["patterns", "ai-patterns"]);

function title(file) {
	const src = readFileSync(file, "utf8");
	const m = src.match(/^title:\s*(.+?)\s*$/m);
	return m ? m[1].replace(/^["']|["']$/g, "") : null;
}

function collect(docsDir, filter) {
	const root = resolve(docsDir, "components");
	const out = [];
	for (const dir of readdirSync(root, { withFileTypes: true })) {
		if (!dir.isDirectory() || !filter(dir.name)) continue;
		for (const f of readdirSync(resolve(root, dir.name))) {
			if (!f.endsWith(".mdx")) continue;
			const name = f.slice(0, -4);
			out.push({
				label: title(resolve(root, dir.name, f)) ?? name,
				slug: `components/${dir.name}/${name}`,
				...(EDMI_ONLY.has(dir.name) ? { attrs: { "data-edmi": "" } } : {}),
			});
		}
	}
	return out.sort((a, b) =>
		a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
	);
}

export function buildSidebar(docsDir, examples) {
	return [
		{
			label: "Getting started",
			items: [
				{ label: "Introduction", link: "/" },
				{ label: "React", slug: "getting-started/react" },
				{ label: "Vue", slug: "getting-started/vue" },
				{ label: "Svelte", slug: "getting-started/svelte" },
				{ label: "Theming", slug: "theming" },
				{ label: "Themes", slug: "themes" },
				{ label: "Rules", slug: "rules" },
				{ label: "Changelog", slug: "changelog" },
			],
		},
		{ label: "Components", items: collect(docsDir, (d) => !isAiDir(d)) },
		{ label: "AI", items: collect(docsDir, isAiDir) },
		{
			label: "Examples",
			items: examples.map((e) => ({
				label: e.title,
				link: `/examples/${e.slug}/`,
			})),
		},
	];
}

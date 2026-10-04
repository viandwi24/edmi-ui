// Section sidebars (Getting Started, Components), generated from the content folders and always expanded.
// Only the section matching the current URL is rendered (see components/overrides/Sidebar.astro).
// New components appear without config edits: drop an mdx under src/content/docs/components/<dir>/.
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Directories whose items are Edmi-only (marked with a small star in the sidebar). */
const EDMI_ONLY = new Set(["patterns", "ai-patterns"]);

function title(file) {
	const src = readFileSync(file, "utf8");
	const m = src.match(/^title:\s*(.+?)\s*$/m);
	return m ? m[1].replace(/^["']|["']$/g, "") : null;
}

function collect(docsDir, dir) {
	const root = resolve(docsDir, "components", dir);
	const out = [];
	for (const f of readdirSync(root)) {
		if (!f.endsWith(".mdx")) continue;
		const name = f.slice(0, -4);
		out.push({
			label: title(resolve(root, f)) ?? name,
			slug: `components/${dir}/${name}`,
			...(EDMI_ONLY.has(dir) ? { attrs: { "data-edmi": "" } } : {}),
		});
	}
	return out.sort((a, b) =>
		a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
	);
}

/** Category subheadings, one per content dir (labels come from src/config.ts). Empty dirs are skipped. */
function categories(docsDir, groups) {
	return groups
		.map((g) => ({
			label:
				EDMI_ONLY.has(g.dir) && !g.label.includes("✦")
					? `${g.label} ✦`
					: g.label,
			items: collect(docsDir, g.dir),
		}))
		.filter((g) => g.items.length);
}

export function buildSidebar(docsDir, { componentGroups, aiGroups }) {
	return [
		{
			label: "Getting Started",
			items: [
				{ label: "Introduction", slug: "getting-started" },
				{
					label: "Installation",
					items: [
						{ label: "React", slug: "getting-started/installation/react" },
						{ label: "Vue", slug: "getting-started/installation/vue" },
						{ label: "Svelte", slug: "getting-started/installation/svelte" },
					],
				},
				{ label: "Theming", slug: "getting-started/theming" },
				{ label: "Elevation", slug: "getting-started/elevation" },
				{ label: "Rules", slug: "getting-started/rules" },
				{ label: "Upgrading", slug: "getting-started/upgrading" },
				{ label: "Agent skills", slug: "getting-started/skills" },
			],
		},
		{
			label: "Components",
			items: [
				{ label: "Overview", link: "/components/" },
				{ label: "UI", items: categories(docsDir, componentGroups) },
				{ label: "AI", items: categories(docsDir, aiGroups) },
			],
		},
	];
}

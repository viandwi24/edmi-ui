/**
 * Plan 09 step 3: prints a component x framework matrix (DESIGN.md §5 + ✦ patterns + theme/all/edmi).
 * A cell is ✓ only when the manifest ships the item for that framework AND the built JSON exists in
 * apps/docs/public/r/<fw>/ AND (for components) the docs page and the demo exist.
 * Exit 1 on any ✗ that is not an explained `skip` (shown as `–`).
 *   bun run verify:matrix [--markdown]   # --markdown prints the README table only
 */
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { listBases, listThemes } from "../packages/tokens/src/css-vars.ts";
import { manifest } from "../registry.manifest/index.ts";
import { themeItemName } from "../registry.manifest/themes.ts";

const ROOT = resolve(import.meta.dir, "..");
const FWS = ["react", "vue", "svelte"] as const;
const EXT = { react: "tsx", vue: "vue", svelte: "svelte" } as const;

/** DESIGN.md §5, by group, as registry item names. */
const REQUIRED: Record<string, string[]> = {
	Meta: ["theme", "all", "patterns", "edmi"],
	Actions: ["button", "button-group", "toggle", "toggle-group", "badge", "kbd"],
	Forms: [
		"label",
		"input",
		"input-group",
		"input-otp",
		"textarea",
		"native-select",
		"select",
		"field",
		"checkbox",
		"radio-group",
		"switch",
		"slider",
		"combobox",
		"calendar",
		"date-picker",
	],
	Display: [
		"card",
		"inset-panel",
		"item",
		"avatar",
		"aspect-ratio",
		"attachment",
		"separator",
		"skeleton",
		"spinner",
		"progress",
		"empty",
	],
	Overlays: [
		"alert",
		"alert-dialog",
		"dialog",
		"sheet",
		"drawer",
		"sonner",
		"tooltip",
		"hover-card",
		"popover",
	],
	Navigation: [
		"dropdown-menu",
		"context-menu",
		"menubar",
		"navigation-menu",
		"command",
		"breadcrumb",
		"pagination",
		"tabs",
		"sidebar",
	],
	Layout: [
		"accordion",
		"collapsible",
		"resizable",
		"scroll-area",
		"carousel",
		"direction",
	],
	Data: ["table", "data-table", "chart"],
	Conversation: [
		"bubble",
		"message",
		"marker",
		"message-scroller",
		"questionnaire",
	],
	"Patterns ✦": [
		"site-header",
		"app-header",
		"stat-tile",
		"ticker-strip",
		"index-row",
		"watchlist-item",
		"allocation-bar",
		"join-panel",
		"leaderboard-podium",
		"feed-post",
		"agent-card",
		"feature-row",
		"step-card",
		"pricing-plan",
		"task-list",
		"kanban-column",
		"layout-picker",
		"code-block",
		"footer",
	],
};

/** AGENTS.md section 5: every item with a `raised` prop ships a `<name>-raised` demo in all three frameworks. */
const RAISED = [
	"button",
	"toggle",
	"toggle-group",
	"kbd",
	"native-select",
	"select",
	"checkbox",
	"radio-group",
	"switch",
	"slider",
	"calendar",
	"date-picker",
	"card",
	"inset-panel",
	"empty",
	"dialog",
	"alert-dialog",
	"popover",
	"sonner",
	"menubar",
	"pagination",
	"tabs",
	"bubble",
	"questionnaire",
	"data-table",
	"site-header",
	"app-header",
	"stat-tile",
	"ticker-strip",
	"watchlist-item",
	"join-panel",
	"leaderboard-podium",
	"feed-post",
	"agent-card",
	"feature-row",
	"step-card",
	"pricing-plan",
	"task-list",
	"kanban-column",
	"layout-picker",
	"code-block",
	"footer",
];

const docsPages = new Set<string>();
const compDir = resolve(ROOT, "apps/docs/src/content/docs/components");
for (const g of readdirSync(compDir, { withFileTypes: true }))
	if (g.isDirectory())
		for (const f of readdirSync(resolve(compDir, g.name)))
			if (f.endsWith(".mdx")) docsPages.add(f.slice(0, -4));

const byName = new Map(manifest.map((i) => [i.name, i]));
const META = new Set(REQUIRED.Meta);

type Cell = "ok" | "skip" | "fail";
let failures = 0;
const problems: string[] = [];
const rows: { group: string; name: string; cells: Cell[]; docs: boolean }[] =
	[];

for (const [group, names] of Object.entries(REQUIRED)) {
	for (const name of names) {
		const item = byName.get(name);
		const cells: Cell[] = FWS.map((fw) => {
			const entry = item?.frameworks[fw];
			if (entry?.skip) return "skip";
			const why: string[] = [];
			if (!item) why.push("not in manifest");
			else if (!entry) why.push("manifest has no entry");
			if (!existsSync(resolve(ROOT, `apps/docs/public/r/${fw}/${name}.json`)))
				why.push("built JSON missing");
			if (
				!META.has(name) &&
				!existsSync(
					resolve(ROOT, `apps/docs/src/demos/${fw}/${name}.${EXT[fw]}`),
				)
			)
				why.push("demo missing");
			if (why.length) {
				problems.push(`${name} [${fw}]: ${why.join(", ")}`);
				return "fail";
			}
			return "ok";
		});
		const docs = META.has(name) || docsPages.has(name);
		if (!docs) problems.push(`${name}: docs page missing`);
		failures += cells.filter((c) => c === "fail").length + (docs ? 0 : 1);
		rows.push({ group, name, cells, docs });
	}
}

for (const name of RAISED)
	for (const fw of FWS) {
		if (byName.get(name)?.frameworks[fw]?.skip) continue;
		if (
			!existsSync(
				resolve(ROOT, `apps/docs/src/demos/${fw}/${name}-raised.${EXT[fw]}`),
			)
		) {
			problems.push(`${name} [${fw}]: raised demo missing`);
			failures++;
		}
	}

// Theme items: every base x accent (auto-discovered from packages/tokens/src/{base,themes}) ships as a
// registry:theme item for each framework, built to apps/docs/public/r/<fw>/.
const themeNames: string[] = [];
for (const b of listBases())
	for (const a of listThemes()) themeNames.push(themeItemName(b, a));
for (const name of themeNames)
	for (const fw of FWS) {
		const entry = byName.get(name)?.frameworks[fw];
		const why: string[] = [];
		if (!entry?.cssVars) why.push("manifest has no cssVars");
		if (!existsSync(resolve(ROOT, `apps/docs/public/r/${fw}/${name}.json`)))
			why.push("built JSON missing");
		if (why.length) {
			problems.push(`${name} [${fw}]: ${why.join(", ")}`);
			failures++;
		}
	}

const sym = { ok: "✓", skip: "–", fail: "✗" } as const;
if (process.argv.includes("--markdown")) {
	console.log(
		"| Group | Item | React | Vue | Svelte |\n| --- | --- | :-: | :-: | :-: |",
	);
	for (const r of rows)
		console.log(
			`| ${r.group} | \`${r.name}\` | ${r.cells.map((c) => sym[c]).join(" | ")} |`,
		);
	process.exit(failures ? 1 : 0);
}

const w = Math.max(...rows.map((r) => r.name.length));
let last = "";
for (const r of rows) {
	if (r.group !== last) {
		console.log(`\n${r.group}`);
		last = r.group;
	}
	console.log(
		`  ${r.name.padEnd(w)}  ${r.cells.map((c) => sym[c]).join("  ")}  ${r.docs ? "" : "✗ docs"}`,
	);
}
console.log(
	"\n  columns: react vue svelte   (✓ manifest+built JSON+demo, – explained skip, ✗ missing)",
);
const skips = rows.flatMap((r) =>
	r.cells
		.map((c, i) => (c === "skip" ? `${r.name} [${FWS[i]}]` : ""))
		.filter(Boolean),
);
if (skips.length)
	console.log(`  skips: ${skips.join(", ")} (see AGENTS.md section 4)`);
if (failures) {
	console.error(`\n${failures} problem(s):\n  ${problems.join("\n  ")}`);
	process.exit(1);
}
console.log(
	`\nAll ${rows.length} items present in all frameworks; ${RAISED.length} raised demos x 3 frameworks present; ${themeNames.length} theme items (${themeNames.join(", ")}) x 3 frameworks present.`,
);

// Regenerates the generated blocks of the consumer agent skill (skills/edmi-ui/references):
//   components.md  catalog of every manifest item, grouped by category, with a "use when" line
//   raised.md      list of items that accept `raised`
// The item list comes from registry.manifest/index.ts, `raised` support is detected from the React source,
// the "use when" text lives in USE_WHEN below. A new manifest item without an entry fails the script and
// `bun test` (scripts/skill.test.ts). Run: `bun run scripts/gen-skill.ts` (add `--check` to only verify).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { manifest } from "../registry.manifest/index.ts";
import type { Item } from "../registry.manifest/types.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const SKILL_DIR = resolve(ROOT, "skills/edmi-ui");

/** One line per item: when to reach for it. Keep every entry consumer-facing (no repo internals). */
export const USE_WHEN: Record<string, string> = {
	// Entry items
	theme:
		"always first: tokens, Tailwind v4 theme map, fonts and the base layer. Install it before any component.",
	edmi: "new React project only (`init` base): theme, fonts, utils and every component in one go.",
	all: "restyle a whole shadcn project in one command (every UI component, no patterns, no AI).",
	patterns:
		"every ✦ pattern block (headers, stat tiles, tickers, feeds, pricing, kanban, footer). Not part of `all`.",
	"ai-all":
		"every AI component, installed into `components/ai/`. Not part of `all`; pair with `theme`.",
	utils: "React only: the `cn` helper at `@/lib/utils`. Pulled in by `edmi`.",
	"font-instrument-sans":
		"React only: Instrument Sans (UI text). Vue and Svelte get fonts through `theme`.",
	"font-jetbrains-mono":
		"React only: JetBrains Mono (every number). Vue and Svelte get fonts through `theme`.",
	"font-sora":
		"React only: Sora 600, exposed as `--font-brand`, for wordmarks only.",
	// Actions
	button:
		"every action. Variants default, secondary, outline, ghost, destructive, link, brand ✦; sizes xs, sm, default, lg, icon*. One primary per region.",
	"button-group":
		"join related buttons, an input and a button, or a button and a label into one control.",
	toggle: "a two-state button (bold, mute, pin).",
	"toggle-group":
		'a set of toggles; `variant="segmented"` ✦ for a flat segmented control; `spacing={0}` joins them.',
	badge:
		'status, count or tag. Variants include brand, success, warning, info; `shape="pill|number"` ✦.',
	kbd: "show a keyboard shortcut; `KbdGroup` for combinations.",
	// Forms
	label: "label a control (Field already includes one).",
	input: "single-line text, email, password, search.",
	textarea: "multi-line text that grows with content.",
	"native-select": "simple or long lists, mobile-friendly browser select.",
	"input-otp": "one-time codes and PINs.",
	"input-group":
		"input with icons, units, buttons or keys inside one shared focus ring.",
	field:
		"a form row: label + control + description + error, vertical, horizontal or responsive. Prefer it over hand-built rows.",
	select: "pick one value from a short list in a popover.",
	combobox: "searchable select, with chips for multiple values.",
	checkbox: "one option on/off or an indeterminate group parent.",
	"radio-group": "exactly one of a few visible options.",
	switch: "instant on/off setting (brand colored when on).",
	slider: "pick a value or a range by dragging.",
	calendar: "month grid for a date or range; used by the date pickers.",
	"date-picker":
		"`DatePicker` for one date, `DateRangePicker` for a range (✦ presets).",
	// Display
	card: "the default container for grouped content. `raised` for hero or key cards.",
	"inset-panel":
		"✦ a panel with header and footer on a muted shell and a card body edge to edge (tool and chat panels).",
	separator: "a thin divider.",
	spinner: "inline loading indicator.",
	skeleton: "placeholder shaped like content that is loading.",
	progress: "task progress; `brand` variant, label and value parts.",
	"aspect-ratio": "lock media to a ratio.",
	avatar:
		"user or entity image with initials fallback; `AvatarGroup` for stacks.",
	item: "a generic row with media, title, description and actions (lists, settings).",
	empty: "empty states: icon media, title, description, actions.",
	attachment:
		"a file or image with upload state (idle, uploading, processing, error, done).",
	// Overlays
	popover: "rich content in a floating panel opened by a button.",
	dialog: "a modal for one focused task.",
	alert:
		"an inline message in the page flow (default, destructive, brand, success, warning, info).",
	"alert-dialog":
		"a blocking confirmation for destructive or irreversible actions.",
	sheet: "a panel that slides in from an edge (filters, details, mobile nav).",
	drawer: "a swipeable bottom or side panel for touch layouts.",
	sonner:
		"toasts. Mount `<Toaster />` once and call `toast(...)`; `<Toaster raised />` for 3D toasts.",
	tooltip: "a short label on hover or focus; never for essential information.",
	"hover-card": "a preview behind a link, shown on hover.",
	// Navigation
	tabs: 'switch views in place. `TabsList variant="default|line|pills"`, `raised` on the list.',
	breadcrumb: "location trail in a hierarchy.",
	pagination: "page navigation for lists and tables.",
	"dropdown-menu": "actions menu opened by a button.",
	"context-menu": "right-click menu.",
	menubar: "a persistent row of menus (desktop-app style).",
	"navigation-menu": "top-level site navigation with rich dropdown panels.",
	command: "command palette and searchable lists (⌘K).",
	"use-mobile":
		"React only: hook that is true below 768px (used by the sidebar).",
	sidebar:
		"the app frame: variants sidebar, floating, inset; collapsible offcanvas, icon, none.",
	// Layout
	accordion:
		'stacked collapsible sections; `variant="card"` ✦ for a carded list (FAQ).',
	collapsible: "one expandable panel.",
	resizable: "draggable split panes.",
	"scroll-area": "thin custom scrollbars over native scrolling.",
	carousel: "swipeable slides; `CarouselDots` ✦ for position dots.",
	direction: "LTR / RTL provider.",
	// Data
	table:
		"static tabular data. Numbers are mono and right-aligned (`numeric`, `trend` props).",
	"data-table": "sortable, filterable, selectable, paginated tables.",
	chart: "charts; series map to `--chart-1…5` so they follow the theme.",
	// Conversation
	bubble:
		"chat bubble: default, secondary, muted, tinted, outline, ghost, destructive; `BubbleReactions`.",
	message:
		"a chat row (avatar, header, content, footer), top-aligned and mirrored with `align`.",
	marker:
		"inline status, system note or labeled separator inside a conversation.",
	"message-scroller":
		"the chat viewport: anchors turns, follows streaming, Jump to latest.",
	questionnaire:
		"multi-step questions with keyboard shortcuts and freeform answers.",
	// Patterns
	"site-header": "marketing top bar: brand, links, one call to action.",
	"app-header":
		"app top bar for the navbar layout: raised nav pills, search, actions.",
	"stat-tile": "a KPI with mono value and delta; `StatStrip` groups several.",
	"ticker-strip": "a horizontal strip of live prices.",
	"index-row":
		"a market-table row: avatars, tags, mono price, delta, sparkline.",
	"watchlist-item":
		"a compact sidebar row: letter tile, symbol, price, change.",
	"allocation-bar": "proportional weights with a legend.",
	"join-panel": "amount input with Max, summary rows and a primary action.",
	"leaderboard-podium": "top-three podium cards.",
	"layout-picker":
		"dashboard or navbar choice cards that persist the choice in a cookie.",
	"feed-post": "a social post card with an attached item and stats.",
	"agent-card": "an AI agent card with identicon, badges and stats.",
	"feature-row": "numbered feature list row (landing pages).",
	"step-card": "numbered step card (how it works).",
	"pricing-plan": "a pricing plan card.",
	"task-list": "agent or project tasks grouped by status.",
	"kanban-column": "a kanban stage column with cards.",
	"code-block":
		"a static code card with copy button for docs and marketing (chat code uses `ai-code-block`).",
	footer: "site footer: brand, link columns, legal line.",
	// AI · Chat
	"ai-conversation":
		"the chat viewport: stick-to-bottom, empty and home states, scroll button, transcript download.",
	"ai-message":
		"one chat turn: `Message`, `MessageContent`, `MessageResponse` (streaming markdown), actions, branches.",
	"ai-prompt-input":
		"the composer: textarea, attachments, tools, selects, submit with streaming status.",
	"ai-suggestion":
		'suggested prompts; `variant="chip"` (default) or `"card"` ✦ for the home state.',
	"ai-attachments": "files and images attached to a prompt or message.",
	"ai-model-selector": "searchable model picker dialog with provider logos.",
	"ai-context": "context-window usage ring with token and cost breakdown.",
	"ai-shimmer": "animated text for streaming and loading status lines.",
	// AI · Agent
	"ai-reasoning": "collapsible thinking block that streams then closes itself.",
	"ai-chain-of-thought": "step-by-step reasoning timeline.",
	"ai-tool": "a tool call: state badge, input parameters, output or error.",
	"ai-confirmation": "tool approval request: requested, accepted, rejected.",
	"ai-sources": "collapsible list of sources a response used.",
	"ai-inline-citation": "inline source chip with a hover card.",
	"ai-plan": "a plan card with streaming title and collapsible steps.",
	"ai-task": "a collapsible task row with file chips.",
	"ai-queue": "queued messages and todos with status dots.",
	"ai-checkpoint": "marks a point in the conversation with a restore action.",
	// AI · Code
	"ai-agent":
		"agent configuration card: model, instructions, tools, output schema.",
	"ai-artifact":
		"container for generated output with header, actions and scrollable body.",
	"ai-code-block":
		"syntax-highlighted code with header, copy, language select. The canonical code block.",
	"ai-commit": "commit summary with hash, author and changed files.",
	"ai-environment-variables": "env var list with masked values and copy.",
	"ai-file-tree": "expandable file and folder tree.",
	"ai-jsx-preview":
		"live preview of streamed JSX/template markup that tolerates unclosed tags.",
	"ai-package-info": "package name, version change and dependencies.",
	// AI · Runtime
	"ai-sandbox":
		"code execution sandbox: state header with code and output tabs.",
	"ai-schema-display":
		"API endpoint with method, path, parameters and schemas.",
	"ai-snippet": "a one-line command or value with a copy button.",
	"ai-stack-trace": "collapsible error stack with file links.",
	"ai-terminal":
		"streaming terminal output with ANSI colors. Always dark, never themed.",
	"ai-test-results": "test run summary with suites and failing tests.",
	"ai-web-preview": "browser frame with URL bar, iframe body and console.",
	// AI · Voice
	"ai-audio-player": "audio player: play, seek, time, volume.",
	"ai-mic-selector": "microphone picker.",
	"ai-persona":
		"animated agent persona that reacts to idle, listening, thinking, speaking, asleep.",
	"ai-speech-input": "dictation button with listening and processing states.",
	"ai-transcription": "time-synced transcript with click-to-seek segments.",
	"ai-voice-selector": "voice picker dialog with search, groups and preview.",
	// AI · Workflow
	"ai-canvas": "workflow canvas (node graph) with the dotted Edmi background.",
	"ai-node": "a workflow node card with handles.",
	"ai-edge": "animated and temporary edges for the canvas.",
	"ai-connection": "the connection line shown while dragging a new edge.",
	"ai-controls": "zoom and fit controls for the canvas.",
	"ai-panel": "an overlay panel in a canvas corner.",
	"ai-toolbar": "a floating toolbar attached to a selected node.",
	"ai-image": "show an AI-generated image from base64 or bytes.",
	"ai-open-in-chat": "dropdown that opens a prompt in another chat product.",
	// AI · Patterns
	"ai-artifact-card":
		"✦ a file card for generated output (paper thumbnail, Download, generating state).",
	"ai-artifact-stack": "✦ a group of artifact cards with Download all.",
	"ai-artifact-viewer":
		"✦ side panel that shows one artifact; documents render as paper.",
	"ai-session-panel":
		"✦ chat side panel: Progress, Outputs, used in this session.",
	"ai-agent-avatar": "✦ 5x5 pixel identicon generated from an agent id.",
	"ai-prompt-input-agent":
		"✦ agent composer with agent chip, @ mentions and raised send.",
	"ai-chat-composer":
		"✦ ready-made composer: attach, speech, disclaimer, model + effort, mode. Start here for a chat app.",
	"ai-chat-header": "✦ conversation header: title, project/model, share, more.",
	// AI · Utilities
	"ai-use-controllable-state":
		"React only: controlled/uncontrolled state hook the AI components share (installed automatically).",
};

const FW_LABEL = { react: "React", vue: "Vue", svelte: "Svelte" } as const;

export function catalogItems(): Item[] {
	return manifest.filter((i) => !i.name.startsWith("theme-"));
}

/**
 * Items with a `raised` prop: parsed from the RAISED / AI_RAISED lists of scripts/verify-matrix.ts, which
 * already requires a `<name>-raised` demo for each (so the list cannot drift from the real components).
 */
export function raisedItems(): string[] {
	const src = readFileSync(resolve(ROOT, "scripts/verify-matrix.ts"), "utf8");
	const list = (name: string) => {
		const m = src.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
		if (!m?.[1])
			throw new Error(`gen-skill: ${name} not found in verify-matrix.ts`);
		return [...m[1].matchAll(/"([^"]+)"/g)].flatMap((x) =>
			x[1] ? [x[1]] : [],
		);
	};
	return [...list("RAISED"), ...list("AI_RAISED").map((n) => `ai-${n}`)];
}

function frameworkNote(item: Item): string {
	const have = (["react", "vue", "svelte"] as const).filter(
		(fw) => item.frameworks[fw] && !item.frameworks[fw]?.skip,
	);
	if (have.length === 3) return "";
	return ` (${have.map((f) => FW_LABEL[f]).join(" + ")} only)`;
}

const CATEGORY_ORDER = [
	"Meta",
	"Actions",
	"Forms",
	"Display",
	"Overlays",
	"Navigation",
	"Layout",
	"Data",
	"Conversation",
	"Patterns",
	"AI · Chat",
	"AI · Agent",
	"AI · Code",
	"AI · Runtime",
	"AI · Voice",
	"AI · Workflow",
	"AI · Patterns",
	"AI · Utilities",
];

const CATEGORY_TITLE: Record<string, string> = {
	Meta: "Entry items (install these, not components)",
	Patterns: "Patterns ✦ (Edmi-only app and marketing blocks)",
};

export function renderCatalog(): string {
	const raised = new Set(raisedItems());
	const by = new Map<string, Item[]>();
	for (const item of catalogItems()) {
		const cat = item.categories[0] ?? "Meta";
		by.set(cat, [...(by.get(cat) ?? []), item]);
	}
	const unknown = [...by.keys()].filter((c) => !CATEGORY_ORDER.includes(c));
	if (unknown.length)
		throw new Error(`gen-skill: add category to CATEGORY_ORDER: ${unknown}`);
	const lines: string[] = [];
	for (const cat of CATEGORY_ORDER) {
		const items = by.get(cat);
		if (!items) continue;
		lines.push(`### ${CATEGORY_TITLE[cat] ?? cat}`, "");
		for (const item of items.sort((a, b) => a.name.localeCompare(b.name))) {
			const why = USE_WHEN[item.name];
			if (!why)
				throw new Error(
					`gen-skill: add a USE_WHEN entry for "${item.name}" in scripts/gen-skill.ts`,
				);
			const r = raised.has(item.name) ? " [raised]" : "";
			lines.push(`- \`${item.name}\`${r}: ${why}${frameworkNote(item)}`);
		}
		lines.push("");
	}
	return lines.join("\n").trimEnd();
}

export function renderRaisedList(): string {
	const names = raisedItems().sort();
	const ui = names.filter((n) => !n.startsWith("ai-"));
	const ai = names.filter((n) => n.startsWith("ai-"));
	const fmt = (xs: string[]) => xs.map((n) => `\`${n}\``).join(", ");
	return [
		`UI and patterns (${ui.length}): ${fmt(ui)}`,
		"",
		`AI (${ai.length}): ${fmt(ai)}`,
	].join("\n");
}

export const BLOCKS = [
	{ file: "references/components.md", id: "catalog", render: renderCatalog },
	{ file: "references/raised.md", id: "raised-list", render: renderRaisedList },
] as const;

export function applyBlock(src: string, id: string, body: string): string {
	const re = new RegExp(
		`(<!-- BEGIN GENERATED: ${id} -->\\n)[\\s\\S]*?(<!-- END GENERATED: ${id} -->)`,
	);
	if (!re.test(src)) throw new Error(`gen-skill: markers for "${id}" missing`);
	return src.replace(re, (_m, a, b) => `${a}${body}\n${b}`);
}

if (import.meta.main) {
	const check = process.argv.includes("--check");
	let stale = false;
	for (const b of BLOCKS) {
		const path = resolve(SKILL_DIR, b.file);
		const cur = readFileSync(path, "utf8");
		const next = applyBlock(cur, b.id, b.render());
		if (next !== cur) {
			stale = true;
			if (!check) writeFileSync(path, next);
			console.log(`${check ? "stale" : "updated"} ${b.file}`);
		}
	}
	if (check && stale) process.exit(1);
	if (!stale) console.log("skill blocks up to date");
}

// Sample data for the AI chat example (Keeper = the sample agent). Shared by react.tsx, vue.vue and
// svelte.svelte: one app with a home, a thread, an artifact viewer and a library.

export type Segment = { t: string; b?: boolean; link?: boolean };

export interface PaperDoc {
	kicker: string;
	headline: string;
	lead: Segment[];
	heading: string;
	body: Segment[];
}

export interface ArtifactDoc {
	id: string;
	title: string;
	/** Card meta line, e.g. "Document · PDF". */
	meta: string;
	/** Shown after the viewer title, in mono. */
	format: string;
	kind: "document";
	/** Card shows the cropped page thumbnail instead of the icon tile. */
	thumbnail: boolean;
	paper: PaperDoc;
}

export type Block =
	| { type: "markdown"; text: string }
	| { type: "code"; code: string; language: "bash" | "typescript" }
	| { type: "archive"; title: string; meta: string }
	| { type: "docs"; ids: string[] };

export interface Turn {
	id: string;
	role: "assistant" | "user";
	blocks: Block[];
}

export const appName = "Edmi";
export const nav = [
	{ view: "thread", label: "Chats" },
	{ view: "library", label: "Library" },
] as const;
export type View = "home" | "thread" | "library";

export const recents = [
	"Keeper starter plan",
	"Eight index ideas",
	"Rebalance MAG4",
	"Launch post draft",
];

export const user = { name: "Dwi", initials: "D" };
export const greeting = "Good evening, Dwi";
export const project = "Roadmap";
export const title = "Keeper starter plan";
export const suggestions = [
	"Write a launch post",
	"Compare fees",
	"Add a token",
];
export const agent = {
	id: "keeper",
	name: "Keeper",
	scope: "trading",
	color: "chart-3",
};

export const notes = `**Before you use this document:**

- **The ranking is a judgment, not a score.** Data backs each idea but not the order.
- **Research is partial.** Some competitors were not checked; all are flagged.

Sources I re-checked:

- [RevenueCat subscription report](https://example.com/revenuecat)
- [Stripe founder data](https://example.com/stripe)
- [Jupiter API terms](https://example.com/jupiter)`;

export const processNote =
	"Updating the task list and marking finished items complete.";

export const thread: Turn[] = [
	{
		id: "t1",
		role: "assistant",
		blocks: [
			{
				type: "markdown",
				text: `**Check before you start:** the quote path for \`@jup-ag/api\` is not confirmed yet (probably \`@jup-ag/api/quote\`). Flagged in \`docs/open-questions.md\`.

**Two open questions** in \`docs/open-questions.md\`:

- Managed RPC in production (default) or your own node?
- Start with one keeper instance? Default is 1.`,
			},
			{ type: "archive", title: "Keeper starter", meta: "ZIP" },
		],
	},
	{
		id: "t2",
		role: "user",
		blocks: [
			{
				type: "markdown",
				text: "What prompt starts the agent after the repo is cloned?",
			},
		],
	},
	{
		id: "t3",
		role: "assistant",
		blocks: [
			{
				type: "markdown",
				text: "The kit ships a `/next-phase` command. After cloning and unzipping into the repo root, type this in your coding agent:",
			},
			{ type: "code", language: "bash", code: "/next-phase 00" },
			{ type: "markdown", text: "Or the short plain prompt:" },
			{
				type: "code",
				language: "bash",
				code: 'Read AGENTS.md, then docs/README.md in order. Do phase 00 in docs/plans/00-scaffold.md until the "Done when" checklist passes.',
			},
		],
	},
	{
		id: "t4",
		role: "user",
		blocks: [
			{
				type: "markdown",
				text: "Good. Which index ideas can a team of 1–3 ship first?",
			},
		],
	},
	{
		id: "t5",
		role: "assistant",
		blocks: [
			{ type: "markdown", text: notes },
			{ type: "docs", ids: ["pdf", "md"] },
		],
	},
	{
		id: "t6",
		role: "user",
		blocks: [
			{
				type: "markdown",
				text: "Add a slide version, point by point?",
			},
		],
	},
	{
		id: "t7",
		role: "assistant",
		blocks: [{ type: "markdown", text: processNote }],
	},
];

export const docs: ArtifactDoc[] = [
	{
		id: "pdf",
		title: "Eight index ideas",
		meta: "Document · PDF",
		format: "PDF",
		kind: "document",
		thumbnail: true,
		paper: {
			kicker: "RESEARCH · 8 INDEX IDEAS · OCT 2026",
			headline: "Distribution, not AI, picks the winner",
			lead: [
				{
					t: "Some indexes can win now, but the product shape and channel decide it. Three shapes work for teams of 1–3 (",
				},
				{ t: "Stripe", link: true },
				{ t: "; " },
				{ t: "RevenueCat", link: true },
				{ t: "). " },
				{ t: "None of the eight ideas passes without conditions.", b: true },
				{
					t: " The three best supported: idea 8 as a B2B ops layer, idea 3 as a local terminal for developers, idea 4 as a learning path.",
				},
			],
			heading: "What wins now: narrow vertical, recurring billing, own channel",
			body: [
				{
					t: "The first winning shape is vertical B2B. Solo founders in the top decile are about ",
				},
				{ t: "twice as likely to build AI-native products", b: true },
				{ t: " and sell to 10 countries in month one." },
			],
		},
	},
	{
		id: "md",
		title: "Eight index ideas",
		meta: "Document · MD",
		format: "MD",
		kind: "document",
		thumbnail: false,
		paper: {
			kicker: "NOTES · 8 INDEX IDEAS · OCT 2026",
			headline: "Eight index ideas, point by point",
			lead: [
				{
					t: "Each idea is scored on channel, margin and time to first holder. ",
				},
				{ t: "Ideas 3, 4 and 8 clear the bar", b: true },
				{ t: "; the other five need a channel first." },
			],
			heading: "Open conditions per idea",
			body: [
				{ t: "Idea 8 needs one design partner. Idea 3 needs a " },
				{ t: "signed terminal build", b: true },
				{ t: ". Idea 4 needs a curriculum owner." },
			],
		},
	},
	{
		id: "mag4",
		title: "MAG4 — Editorial minimal",
		meta: "Design · Draft",
		format: "DESIGN",
		kind: "document",
		thumbnail: false,
		paper: {
			kicker: "DESIGN · MAG4 · OCT 2026",
			headline: "MAG4, editorial and minimal",
			lead: [
				{ t: "A flat, typographic index page: one " },
				{ t: "serif headline", b: true },
				{ t: ", a mono number column and a single accent." },
			],
			heading: "Layout notes",
			body: [
				{ t: "Cards stay flat; only the " },
				{ t: "primary action", b: true },
				{ t: " rises." },
			],
		},
	},
	{
		id: "stockbreak",
		title: "Stockbreak",
		meta: "Design · Shared",
		format: "DESIGN",
		kind: "document",
		thumbnail: false,
		paper: {
			kicker: "DESIGN · STOCKBREAK · SEP 2026",
			headline: "Stockbreak markets, shared with you",
			lead: [
				{ t: "The markets, explore and portfolio pages in one " },
				{ t: "layered", b: true },
				{ t: " app shell." },
			],
			heading: "Review status",
			body: [
				{ t: "Two comments open on the " },
				{ t: "leaderboard podium", b: true },
				{ t: "." },
			],
		},
	},
];

export type ArtifactType = "docs" | "slides" | "design";

export const tabs = [
	{ value: "all", label: "All" },
	{ value: "yours", label: "Yours" },
	{ value: "shared", label: "Shared with you" },
];

export const banner = {
	title: "Designs live here now",
	text: "New slides and designs are saved as artifacts.",
	action: "Open the design home",
};

export const tiles: { type: ArtifactType; label: string }[] = [
	{ type: "docs", label: "Docs" },
	{ type: "slides", label: "Slides" },
	{ type: "design", label: "Design" },
];

export interface LibraryItem {
	id: string;
	type: ArtifactType;
	title: string;
	note?: string;
	/** Appears under "Shared with you" (and not under "Yours"). */
	shared?: boolean;
	viewed: string;
	/** Viewer document opened by this row. */
	docId: string;
}

export const groups: { label: string; items: LibraryItem[] }[] = [
	{
		label: "Today",
		items: [
			{
				id: "a1",
				type: "design",
				title: "MAG4 — Editorial minimal",
				viewed: "Viewed 20m ago",
				docId: "mag4",
			},
			{
				id: "a2",
				type: "slides",
				title: "8 index ideas",
				viewed: "Viewed 1h ago",
				docId: "pdf",
			},
		],
	},
	{
		label: "September",
		items: [
			{
				id: "a3",
				type: "docs",
				title: "Keeper spec",
				viewed: "Viewed Sep 24",
				docId: "md",
			},
			{
				id: "a4",
				type: "design",
				title: "Stockbreak",
				note: "Shared with you",
				shared: true,
				viewed: "Viewed Sep 26",
				docId: "stockbreak",
			},
		],
	},
];

export const menu = ["Open", "Rename", "Share", "Delete"];

export const composer = {
	disclaimer: "Edmi is AI and can make mistakes.",
	models: [
		{ id: "opus", label: "Opus" },
		{ id: "sonnet", label: "Sonnet" },
	],
	efforts: [
		{ id: "low", label: "Low" },
		{ id: "medium", label: "Medium" },
		{ id: "high", label: "High" },
	],
	modes: [
		{ id: "auto", label: "Auto" },
		{ id: "ask", label: "Ask first" },
	],
};

// Agent-home task list (Queue).
export interface Task {
	id: string;
	title: string;
	age: string;
	agent: { id: string; color: string };
	status: "running" | "done";
}

export const tasks: Task[] = [
	{
		id: "1",
		title: "Draft feed post",
		age: "1m",
		agent: { id: "writer", color: "chart-4" },
		status: "running",
	},
	{
		id: "2",
		title: "Rebalance MAG4",
		age: "4d",
		agent: { id: "keeper", color: "chart-3" },
		status: "done",
	},
];

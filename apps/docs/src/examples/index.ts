import type { Framework } from "../config";

/**
 * Examples registry: the single list that drives the `/examples` index, the routes
 * (`/examples/<slug>/` and `/examples/<slug>/render/<fw>/`), the sidebar and `scripts/verify-examples.ts`.
 * Source of each example: `src/examples/<dir>/{data.ts, react.tsx, vue.vue, svelte.svelte}` (dir defaults to the slug; see README.md).
 */
export const EXAMPLE_TAGS = ["AI", "App", "Marketing", "Theme"] as const;
export type ExampleTag = (typeof EXAMPLE_TAGS)[number];

export interface ExampleMeta {
	/** URL segment and folder name under src/examples. */
	slug: string;
	title: string;
	tag: ExampleTag;
	description: string;
	/** Source board (EXAMPLES.md "Source board" column). */
	board: string;
	/** Thumbnail basename: `public/examples/<thumb>-light.png` and `-dark.png` (~800px wide). */
	thumb: string;
	/** Frameworks that ship a live example (all three is the rule; verify-examples enforces files). */
	frameworks: readonly Framework[];
	/** Iframe height of the preview frame in px (default 760). */
	height?: number;
	/** Initial mode of the viewer and the thumbnail shown on the index (default: follows the site mode). */
	defaultMode?: "light" | "dark";
	/** Initial base color of the viewer (default `stone`). */
	defaultBase?: string;
	/** Initial accent theme of the viewer (default `green`). */
	defaultTheme?: string;
	/** Registry items the example is built from (shown on the page). */
	uses: readonly string[];
	/** Source folder under src/examples when several examples share one source (default: the slug). */
	dir?: string;
	/** Props passed to the example's root component (e.g. `{ layout: "sidebar" }`). */
	props?: Readonly<Record<string, string>>;
}

export const ALL = ["react", "vue", "svelte"] as const;

export const EXAMPLES: readonly ExampleMeta[] = [
	{
		slug: "claude-chat",
		title: "Claude - Chat",
		tag: "AI",
		description:
			"A complete chat app: greeting home with suggestions, a full assistant thread with artifact cards and code blocks, the artifact viewer side panel, and the artifact library, switchable from the app sidebar.",
		board: "AI 03 Home · AI 04 Chat thread, Chat + Artifact Viewer, Library",
		thumb: "claude-chat",
		frameworks: ALL,
		height: 860,
		uses: [
			"ChatHeader",
			"Conversation",
			"Message",
			"MessageResponse",
			"ArtifactCard",
			"ArtifactStack",
			"ArtifactViewer",
			"CodeBlock",
			"Suggestion",
			"ChatComposer",
			"Tabs",
			"Item",
		],
	},
	{
		slug: "stockbreak-navbar",
		title: "Stockbreak - Navbar",
		tag: "App",
		description:
			"The Stockbreak app with a top navbar: Markets, Explore, Index detail, Leaderboard, Create index, Feed, AI agents, Portfolio, Profile and Faucet pages with working navigation, plus the marketing landing.",
		board: "Stockbreak · all pages (navbar layout)",
		thumb: "stockbreak-navbar",
		dir: "stockbreak",
		props: { layout: "navbar" },
		frameworks: ALL,
		height: 900,
		uses: [
			"AppHeader",
			"TickerStrip",
			"IndexRow",
			"LeaderboardPodium",
			"Card",
			"Table",
			"Tabs",
			"Field",
			"Badge",
			"Button",
		],
	},
	{
		slug: "stockbreak-sidebar",
		title: "Stockbreak - Sidebar",
		tag: "App",
		description:
			"The same Stockbreak app in the sidebar shell: inset Sidebar with search, navigation, watchlist and the faucet card, breadcrumb header, and every app page behind working navigation.",
		board: "Stockbreak · all pages (sidebar layout)",
		thumb: "stockbreak-sidebar",
		dir: "stockbreak",
		props: { layout: "sidebar" },
		frameworks: ALL,
		height: 900,
		uses: [
			"Sidebar",
			"WatchlistItem",
			"TickerStrip",
			"IndexRow",
			"Card",
			"Table",
			"Tabs",
			"Field",
			"Badge",
			"Button",
		],
	},
	{
		slug: "layerbeat",
		title: "Layerbeat",
		tag: "App",
		description:
			"Layerbeat Create a BeatVPS: always-dark navy sidebar scoped inside a light app, step tabs, location and image choice cards, a plan table with radio selection, billing segmented control and a raised summary card.",
		board: "Layerbeat Example",
		thumb: "layerbeat",
		defaultBase: "slate",
		defaultTheme: "ocean",
		frameworks: ALL,
		height: 900,
		uses: [
			"Sidebar",
			"Tabs",
			"Field",
			"RadioGroup",
			"Table",
			"Select",
			"ToggleGroup",
			"Switch",
			"Card",
			"Badge",
			"Kbd",
		],
	},
	{
		slug: "cofounder-landing",
		title: "Cofounder (Long Page)",
		tag: "Marketing",
		description:
			"Cofounder-style dark landing page from hero to footer: pixel-art sky hero, agent workspace card, launch, grow and operate feature rows with staged boards, campaign report, metrics and live joiners, tools window, guide chapters and a footer scene.",
		board: "Cofounder Clone · Landing (dark)",
		thumb: "cofounder-landing",
		defaultMode: "dark",
		frameworks: ALL,
		height: 900,
		uses: [
			"FeatureRow",
			"Card",
			"InsetPanel",
			"Tabs",
			"StatTile",
			"Avatar",
			"Badge",
			"Button",
		],
	},
	{
		slug: "cofounder-agent-workspace",
		title: "Cofounder - Agent Workspace",
		tag: "AI",
		description:
			"A side panel for an agent app: pill tabs on an inset panel, an Agent tab with collapsed reasoning, a named agent with suggestion cards and a raised composer, and an Index tab with grouped settings lists.",
		board: "AI 04 · Agent workspace",
		thumb: "cofounder-agent-workspace",
		frameworks: ALL,
		height: 940,
		uses: [
			"InsetPanel",
			"Tabs",
			"Reasoning",
			"Message",
			"AgentAvatar",
			"Suggestion",
			"PromptInput",
			"PromptInputAgent",
			"Item",
			"Button",
		],
	},
	{
		slug: "workflow",
		title: "Agent Workflow",
		tag: "AI",
		description:
			"A workflow canvas for an agent: trigger, tool and agent nodes, animated and conditional edges, a node toolbar, legend and run panels, and zoom controls.",
		board: "AI 08 · Canvas",
		thumb: "workflow",
		frameworks: ALL,
		height: 720,
		uses: [
			"Canvas",
			"Node",
			"Edge",
			"Controls",
			"Panel",
			"Toolbar",
			"Badge",
			"Button",
		],
	},
	{
		slug: "ide",
		title: "Coding Agent IDE",
		tag: "AI",
		description:
			"A coding workspace: file tree, code editor with header and line numbers, a terminal with a failing run, and the agent pane with a plan, queue and composer.",
		board: "AI 05/06 · Code authoring + runtime",
		thumb: "ide",
		frameworks: ALL,
		height: 820,
		uses: [
			"FileTree",
			"CodeBlock",
			"Terminal",
			"Plan",
			"Queue",
			"Conversation",
			"Message",
			"PromptInput",
		],
	},
];

export const getExample = (slug: string) =>
	EXAMPLES.find((e) => e.slug === slug);
/** Source folder of an example (several examples may share one). */
export const exampleDir = (e: ExampleMeta) => e.dir ?? e.slug;
export const EXAMPLE_FILE: Record<Framework, string> = {
	react: "react.tsx",
	vue: "vue.vue",
	svelte: "svelte.svelte",
};

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
	/** Short internal label (not shown in the UI). */
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
		slug: "ai-chat",
		title: "AI Chat",
		tag: "AI",
		description:
			"A complete chat app: greeting home with suggestions, a full assistant thread with artifact cards and code blocks, the artifact viewer side panel, and the artifact library, switchable from the app sidebar.",
		board: "AI chat app",
		thumb: "ai-chat",
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
		board: "Stockbreak app (navbar)",
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
		board: "Stockbreak app (sidebar)",
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
		board: "Layerbeat app",
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
		slug: "agent-canvas",
		title: "Agent Canvas",
		tag: "AI",
		description:
			"An agent canvas app: an agent hub on a department ring with elbow connectors and zoom controls, beside a floating panel with Atlas chat, Tasks, Company and Library tabs and a pinned composer.",
		board: "Agent canvas",
		thumb: "agent-canvas",
		defaultMode: "dark",
		frameworks: ALL,
		height: 860,
		uses: [
			"InsetPanel",
			"Tabs",
			"AgentAvatar",
			"PromptInput",
			"Suggestion",
			"Message",
			"Item",
			"Card",
			"Checkbox",
			"InputGroup",
			"ToggleGroup",
			"Avatar",
			"Button",
		],
	},
	{
		slug: "editorial-landing",
		title: "Editorial Landing",
		tag: "Marketing",
		description:
			"A dark landing page from hero to footer: pixel-art sky hero, agent workspace card, launch, grow and operate feature rows with staged boards, campaign report, metrics and live joiners, tools window, guide chapters and a footer scene.",
		board: "Landing page",
		thumb: "editorial-landing",
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
		slug: "agent-workspace",
		title: "Agent Workspace",
		tag: "AI",
		description:
			"A side panel for an agent app: pill tabs on an inset panel, an Agent tab with collapsed reasoning, a named agent with suggestion cards and a raised composer, and an Index tab with grouped settings lists.",
		board: "Agent workspace",
		thumb: "agent-workspace",
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
		board: "Workflow canvas",
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
		board: "Coding agent IDE",
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

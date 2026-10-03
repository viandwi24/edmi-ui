import type { Framework } from "../config";
import { examples as aiA } from "./_groups/ai-a";
import { examples as aiB } from "./_groups/ai-b";
import { examples as appA } from "./_groups/app-a";
import { examples as appB } from "./_groups/app-b";
import { examples as marketing } from "./_groups/marketing";

/**
 * Examples registry: the single list that drives the `/examples` index, the routes
 * (`/examples/<slug>/` and `/examples/<slug>/render/<fw>/`), the sidebar and `scripts/verify-examples.ts`.
 * Source of each example: `src/examples/<slug>/{data.ts, react.tsx, vue.vue, svelte.svelte}` (see README.md).
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
	/** Registry items the example is built from (shown on the page). */
	uses: readonly string[];
}

export const ALL = ["react", "vue", "svelte"] as const;

const PILOT: ExampleMeta[] = [
	{
		slug: "chat-thread",
		title: "Chat thread",
		tag: "AI",
		description:
			"A full assistant thread: header bar, long response without avatar, artifact card, user bubble, code blocks, scroll-to-latest button and the docked chat composer.",
		board: "AI 04 · Chat thread",
		thumb: "chat-thread",
		frameworks: ALL,
		height: 820,
		uses: [
			"ChatHeader",
			"Conversation",
			"Message",
			"MessageResponse",
			"ArtifactCard",
			"CodeBlock",
			"ConversationScrollButton",
			"ChatComposer",
		],
	},
	{
		slug: "markets",
		title: "Markets dashboard",
		tag: "App",
		description:
			"Stockbreak Markets: app header, ticker strip, top indexes table with sparklines, Human vs AI tiles, creators and activity lists, all with raised cards.",
		board: "Stockbreak · Markets",
		thumb: "markets",
		frameworks: ALL,
		height: 900,
		uses: [
			"AppHeader",
			"TickerStrip",
			"IndexRow",
			"Card",
			"Table",
			"Badge",
			"Button",
		],
	},
];

/** Pilot entries + one file per worker group (src/examples/_groups/*.ts). */
export const EXAMPLES: readonly ExampleMeta[] = [
	...PILOT,
	...aiA,
	...aiB,
	...appA,
	...appB,
	...marketing,
];

export const getExample = (slug: string) =>
	EXAMPLES.find((e) => e.slug === slug);
export const EXAMPLE_FILE: Record<Framework, string> = {
	react: "react.tsx",
	vue: "vue.vue",
	svelte: "svelte.svelte",
};

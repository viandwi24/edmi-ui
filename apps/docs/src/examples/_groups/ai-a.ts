import type { ExampleMeta } from "../index";

const ALL = ["react", "vue", "svelte"] as const;

/** Examples owned by the `ai-a` worker group. Append entries; keep the order of EXAMPLES.md. */
export const examples: ExampleMeta[] = [
	{
		slug: "chat-artifact",
		title: "Chat + artifact viewer",
		tag: "AI",
		description:
			"The split view: the conversation on the left with an artifact stack and a process note, the selected artifact open on the right as paper. Clicking another card swaps the viewer; expand makes it fullscreen.",
		board: "AI 04 · Chat + Artifact Viewer",
		thumb: "chat-artifact",
		frameworks: ALL,
		height: 780,
		uses: [
			"Resizable",
			"Conversation",
			"Message",
			"ArtifactStack",
			"ArtifactCard",
			"ArtifactViewer",
			"ChatComposer",
		],
	},
	{
		slug: "agent-workspace",
		title: "Agent workspace",
		tag: "AI",
		description:
			"A side panel for an agent app: pill tabs on an inset panel, an Agent tab with collapsed reasoning, a named agent with suggestion cards and a raised composer, and an Index tab with grouped settings lists.",
		board: "AI 04 · Agent workspace",
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
		slug: "library",
		title: "Artifact library",
		tag: "AI",
		description:
			"Where generated artifacts live: tabs, search and view buttons, a dismissible banner, make-something-new tiles, and a list grouped by date with type icon, visibility, last viewed and a row menu.",
		board: "AI 04 · Library",
		thumb: "library",
		frameworks: ALL,
		height: 860,
		uses: ["Tabs", "Card", "Badge", "Item", "DropdownMenu", "Button"],
	},
];

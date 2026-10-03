import type { ExampleMeta } from "../index";

const ALL = ["react", "vue", "svelte"] as const;

/** Examples owned by the `ai-b` worker group. Append entries; keep the order of EXAMPLES.md. */
export const examples: ExampleMeta[] = [
	{
		slug: "agent-home",
		title: "Agent home",
		tag: "AI",
		description:
			"The empty home state of an agent app: centered greeting with a project badge, the task queue, suggestion chips and the docked agent composer.",
		board: "AI 03 · Home · greeting",
		thumb: "agent-home",
		frameworks: ALL,
		height: 760,
		uses: [
			"ConversationEmptyState",
			"Queue",
			"Suggestions",
			"PromptInput",
			"PromptInputAgent",
			"Badge",
		],
	},
	{
		slug: "ide",
		title: "Coding agent IDE",
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
	{
		slug: "workflow",
		title: "Agent workflow",
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
];

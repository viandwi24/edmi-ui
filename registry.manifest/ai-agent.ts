import { aiItem, aiReact, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Agent: board AI 02 agent output (Reasoning, Chain of Thought, Tool, Confirmation, Sources, Inline Citation, Plan, Task, Queue, Checkpoint). */
export const items: Item[] = [
	aiItem({
		name: "reasoning",
		title: "Reasoning",
		description:
			"Collapsible thinking block that streams while the model reasons and closes itself when done.",
		category: C.agent,
		deps: ["collapsible", "ai-shimmer"],
		optionalDeps: ["ai-use-controllable-state"],
		react: aiReact("reasoning", [
			"cn",
			"streamdown",
			"@streamdown/cjk",
			"@streamdown/code",
			"@streamdown/math",
			"@streamdown/mermaid",
		]),
	}),
	aiItem({
		name: "chain-of-thought",
		title: "Chain of Thought",
		description:
			"Step-by-step reasoning timeline with search results and images per step.",
		category: C.agent,
		deps: ["badge", "collapsible"],
		optionalDeps: ["ai-use-controllable-state"],
		react: aiReact("chain-of-thought", ["cn"]),
	}),
	aiItem({
		name: "tool",
		title: "Tool",
		description:
			"Tool call card with a state badge, collapsible input parameters and output or error.",
		category: C.agent,
		deps: ["badge", "collapsible"],
		react: aiReact("tool", ["ai", "cn"]),
	}),
	aiItem({
		name: "confirmation",
		title: "Confirmation",
		description:
			"Tool approval request with request, accepted and rejected states.",
		category: C.agent,
		deps: ["alert", "button"],
		react: aiReact("confirmation", ["ai", "cn"]),
	}),
	aiItem({
		name: "sources",
		title: "Sources",
		description: "Collapsible list of the sources a response used.",
		category: C.agent,
		deps: ["collapsible"],
		react: aiReact("sources", ["cn"]),
	}),
	aiItem({
		name: "inline-citation",
		title: "Inline Citation",
		description:
			"Inline source chip with a hover card that pages through the sources.",
		category: C.agent,
		deps: ["badge", "button", "carousel", "hover-card"],
		react: aiReact("inline-citation", ["cn"]),
	}),
	aiItem({
		name: "plan",
		title: "Plan",
		description:
			"Plan card with streaming title and description and collapsible steps.",
		category: C.agent,
		deps: ["button", "card", "collapsible", "ai-shimmer"],
		react: aiReact("plan", ["cn"]),
	}),
	aiItem({
		name: "task",
		title: "Task",
		description: "Collapsible task row with file chips.",
		category: C.agent,
		deps: ["collapsible"],
		react: aiReact("task", ["cn"]),
	}),
	aiItem({
		name: "queue",
		title: "Queue",
		description:
			"Queued messages and todos in collapsible sections with status dots.",
		category: C.agent,
		deps: ["badge", "button", "collapsible", "scroll-area"],
		react: aiReact("queue", ["cn"]),
	}),
	aiItem({
		name: "checkpoint",
		title: "Checkpoint",
		description: "Marks a point in the conversation with a restore action.",
		category: C.agent,
		deps: ["button", "separator", "tooltip"],
		react: aiReact("checkpoint", ["cn"]),
	}),
];

import { aiItem, aiReact, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/**
 * AI · Patterns: Edmi ✦ additions (boards AI 03/04, REVISIONS v3 #5 and #7). Not in Vercel AI Elements.
 * Suggestion `variant="card | chip"` and the Conversation home state live in ai-suggestion / ai-conversation.
 */
export const items: Item[] = [
	aiItem({
		name: "artifact-card",
		title: "Artifact Card",
		description:
			"File card for generated output: paper thumbnail, format meta, split Download and a generating state.",
		category: C.patterns,
		deps: ["card", "button", "button-group", "dropdown-menu", "ai-shimmer"],
		react: aiReact("artifact-card", ["cn"]),
	}),
	aiItem({
		name: "artifact-stack",
		title: "Artifact Stack",
		description: "A group of artifact cards with a Download all action.",
		category: C.patterns,
		deps: ["button", "ai-artifact-card"],
		react: aiReact("artifact-stack", ["cn"]),
	}),
	aiItem({
		name: "artifact-viewer",
		title: "Artifact Viewer",
		description:
			"Side panel that shows one artifact: title and format, open-in, download, expand and close; documents render as paper.",
		category: C.patterns,
		deps: ["button", "card", "tooltip"],
		react: aiReact("artifact-viewer", ["cn"]),
	}),
	aiItem({
		name: "session-panel",
		title: "Session Panel",
		description:
			"Chat side panel: Progress, Outputs with preview and file list, and what was used in this session.",
		category: C.patterns,
		deps: [
			"button",
			"card",
			"collapsible",
			"progress",
			"separator",
			"ai-artifact-card",
		],
		react: aiReact("session-panel", ["cn"]),
	}),
	aiItem({
		name: "agent-avatar",
		title: "Agent Avatar",
		description:
			"5 by 5 pixel identicon generated from an agent id, tinted with a chart color.",
		category: C.patterns,
		deps: [],
		react: aiReact("agent-avatar", ["cn"]),
	}),
	aiItem({
		name: "prompt-input-agent",
		title: "Prompt Input Agent",
		description:
			"Agent composer: agent chip, @ mention list and raised send button.",
		category: C.patterns,
		deps: ["ai-agent-avatar", "button"],
		react: aiReact("prompt-input-agent", ["cn"]),
	}),
	aiItem({
		name: "chat-composer",
		title: "Chat Composer",
		description:
			"Prompt input with the outside footer: attach, speech, disclaimer, model with effort, and mode.",
		category: C.patterns,
		deps: ["ai-prompt-input", "button", "dropdown-menu"],
		react: aiReact("chat-composer", ["ai", "cn"]),
	}),
	aiItem({
		name: "chat-header",
		title: "Chat Header",
		description:
			"Conversation header: title, agent or model, share and more actions.",
		category: C.patterns,
		deps: ["button", "dropdown-menu"],
		react: aiReact("chat-header", ["cn"]),
	}),
];

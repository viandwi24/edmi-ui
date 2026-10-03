import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
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
		deps: ["card", "button", "dropdown-menu"],
	}),
	aiItem({
		name: "artifact-stack",
		title: "Artifact Stack",
		description: "A group of artifact cards with a Download all action.",
		category: C.patterns,
		deps: ["button", "ai-artifact-card"],
	}),
	aiItem({
		name: "artifact-viewer",
		title: "Artifact Viewer",
		description:
			"Side panel that shows one artifact: title and format, open-in, download, expand and close; documents render as paper.",
		category: C.patterns,
		deps: ["button", "tooltip", "dropdown-menu"],
	}),
	aiItem({
		name: "session-panel",
		title: "Session Panel",
		description:
			"Chat side panel: Progress, Outputs with preview and file list, and what was used in this session.",
		category: C.patterns,
		deps: ["progress", "ai-artifact-card"],
	}),
	aiItem({
		name: "agent-avatar",
		title: "Agent Avatar",
		description:
			"5 by 5 pixel identicon generated from an agent id, tinted with a chart color.",
		category: C.patterns,
		deps: ["avatar"],
	}),
	aiItem({
		name: "prompt-input-agent",
		title: "Prompt Input Agent",
		description:
			"Agent composer: agent chip, @ mention list and raised send button.",
		category: C.patterns,
		deps: ["ai-prompt-input", "ai-agent-avatar", "badge", "command", "popover"],
	}),
	aiItem({
		name: "chat-composer",
		title: "Chat Composer",
		description:
			"Prompt input with the outside footer: attach, speech, disclaimer, model with effort, and mode.",
		category: C.patterns,
		deps: ["ai-prompt-input", "button", "dropdown-menu", "select"],
	}),
	aiItem({
		name: "chat-header",
		title: "Chat Header",
		description:
			"Conversation header: title, agent or model, share and more actions.",
		category: C.patterns,
		deps: ["button", "dropdown-menu"],
	}),
];

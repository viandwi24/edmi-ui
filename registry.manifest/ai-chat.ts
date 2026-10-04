import { aiItem, aiReact, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Chat: board AI 01 (Conversation, Message, Prompt Input, Suggestion, Attachments, Model Selector, Context, Shimmer). */
export const items: Item[] = [
	aiItem({
		name: "conversation",
		title: "Conversation",
		description:
			"Chat viewport built on the message scroller: follows streaming replies, empty and home states, scroll-to-latest and transcript download.",
		category: C.chat,
		deps: ["button", "message-scroller"],
		react: aiReact("conversation", ["ai", "cn"]),
	}),
	aiItem({
		name: "message",
		title: "Message",
		description:
			"One chat turn: secondary user bubble or full-width assistant response with markdown typography, actions, branches and toolbar.",
		category: C.chat,
		deps: ["button", "button-group", "tooltip", "message", "bubble"],
		react: aiReact("message", [
			"@streamdown/cjk",
			"@streamdown/code",
			"@streamdown/math",
			"@streamdown/mermaid",
			"ai",
			"cn",
			"streamdown",
		]),
	}),
	aiItem({
		name: "prompt-input",
		title: "Prompt Input",
		description:
			"The composer: auto-growing textarea, attachments, header and footer tools, model and mode pickers, submit with streaming status.",
		category: C.chat,
		deps: [
			"command",
			"dropdown-menu",
			"hover-card",
			"input-group",
			"select",
			"spinner",
			"tooltip",
			"elevation",
		],
		react: aiReact("prompt-input", ["ai", "cn", "nanoid"]),
	}),
	aiItem({
		name: "suggestion",
		title: "Suggestion",
		description:
			"Suggested prompts as pills in a scrollable row, with a card variant for the home state.",
		category: C.chat,
		deps: ["button", "scroll-area", "elevation"],
		react: aiReact("suggestion", ["cn"]),
	}),
	aiItem({
		name: "attachments",
		title: "Attachments",
		description:
			"Files and images attached to a message or prompt: grid, inline and list layouts with preview and remove.",
		category: C.chat,
		deps: ["button", "hover-card", "attachment"],
		react: aiReact("attachments", ["ai", "cn"]),
	}),
	aiItem({
		name: "model-selector",
		title: "Model Selector",
		description:
			"Searchable model picker in a command dialog, with provider logos and grouped lists.",
		category: C.chat,
		deps: ["command", "dialog"],
		react: aiReact("model-selector", ["cn"]),
	}),
	aiItem({
		name: "context",
		title: "Context",
		description:
			"Context window usage ring with a hover card of token and cost breakdown.",
		category: C.chat,
		deps: ["button", "hover-card", "progress"],
		react: aiReact("context", ["ai", "cn", "tokenlens"]),
	}),
	aiItem({
		name: "shimmer",
		title: "Shimmer",
		description:
			"Animated sweep over streaming or loading text; used for status lines inside a ghost bubble.",
		category: C.chat,
		react: aiReact("shimmer", ["cn", "motion"]),
	}),
];

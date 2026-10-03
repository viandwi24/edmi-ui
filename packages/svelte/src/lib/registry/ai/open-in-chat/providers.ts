// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import type { Component } from "svelte";
import ChatGPTIcon from "./icons/chatgpt.svelte";
import ClaudeIcon from "./icons/claude.svelte";
import CursorIcon from "./icons/cursor.svelte";
import GitHubIcon from "./icons/github.svelte";
import SciraIcon from "./icons/scira.svelte";
import T3Icon from "./icons/t3.svelte";
import V0Icon from "./icons/v0.svelte";

export type ProviderKey = "github" | "scira" | "chatgpt" | "claude" | "t3" | "v0" | "cursor";

export type ProviderConfig = {
	title: string;
	/** Brand tile color (AI 08 board; brand marks are the one place literal colors are allowed). */
	color: string;
	createUrl: (query: string) => string;
	// biome-ignore lint/suspicious/noExplicitAny: icon components take different props
	icon: Component<any>;
};

export const providers: Record<ProviderKey, ProviderConfig> = {
	github: {
		title: "Open in GitHub",
		color: "#24292f",
		createUrl: (url) => url,
		icon: GitHubIcon,
	},
	scira: {
		title: "Open in Scira",
		color: "#111",
		createUrl: (q) => `https://scira.ai/?${new URLSearchParams({ q })}`,
		icon: SciraIcon,
	},
	chatgpt: {
		title: "Open in ChatGPT",
		color: "#10a37f",
		createUrl: (prompt) =>
			`https://chatgpt.com/?${new URLSearchParams({ hints: "search", prompt })}`,
		icon: ChatGPTIcon,
	},
	claude: {
		title: "Open in Claude",
		color: "#d97757",
		createUrl: (q) => `https://claude.ai/new?${new URLSearchParams({ q })}`,
		icon: ClaudeIcon,
	},
	t3: {
		title: "Open in T3 Chat",
		color: "#8b1d6b",
		createUrl: (q) => `https://t3.chat/new?${new URLSearchParams({ q })}`,
		icon: T3Icon,
	},
	v0: {
		title: "Open in v0",
		color: "#111",
		createUrl: (q) => `https://v0.app?${new URLSearchParams({ q })}`,
		icon: V0Icon,
	},
	cursor: {
		title: "Open in Cursor",
		color: "#333",
		createUrl: (text) => {
			const url = new URL("https://cursor.com/link/prompt");
			url.searchParams.set("text", text);
			return url.toString();
		},
		icon: CursorIcon,
	},
};

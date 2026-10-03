import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Runtime: board AI 06 (Sandbox, Schema Display, Snippet, Stack Trace, Terminal, Test Results, Web Preview). */
export const items: Item[] = [
	aiItem({
		name: "sandbox",
		title: "Sandbox",
		description:
			"Code execution sandbox: state header with tabs for code and output.",
		category: C.runtime,
		deps: ["collapsible", "tabs", "ai-tool"],
	}),
	aiItem({
		name: "schema-display",
		title: "Schema Display",
		description:
			"API endpoint with method badge, path, parameters and nested request and response schemas.",
		category: C.runtime,
		deps: ["badge", "collapsible"],
	}),
	aiItem({
		name: "snippet",
		title: "Snippet",
		description: "One-line command or value with a copy button.",
		category: C.runtime,
		deps: ["input-group"],
	}),
	aiItem({
		name: "stack-trace",
		title: "Stack Trace",
		description:
			"Collapsible error stack with file links and internal frame filtering.",
		category: C.runtime,
		deps: ["button", "collapsible"],
		optionalDeps: ["ai-use-controllable-state"],
	}),
	aiItem({
		name: "terminal",
		title: "Terminal",
		description:
			"Streaming terminal output with ANSI colors. Always dark, never themed.",
		category: C.runtime,
		deps: ["button"],
	}),
	aiItem({
		name: "test-results",
		title: "Test Results",
		description:
			"Test run summary with progress, suites and failing test details.",
		category: C.runtime,
		deps: ["badge", "collapsible"],
	}),
	aiItem({
		name: "web-preview",
		title: "Web Preview",
		description:
			"Browser frame with navigation, URL bar, iframe body and console.",
		category: C.runtime,
		deps: ["button", "collapsible", "input", "tooltip"],
	}),
];

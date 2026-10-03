import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Code: board AI 05 authoring (Agent, Artifact, Code Block, Commit, Environment Variables, File Tree, JSX Preview, Package Info). */
export const items: Item[] = [
	aiItem({
		name: "agent",
		title: "Agent",
		description:
			"Agent configuration card: model, instructions, tools and output schema.",
		category: C.code,
		deps: ["accordion", "badge", "ai-code-block"],
	}),
	aiItem({
		name: "artifact",
		title: "Artifact",
		description:
			"Container for generated output with a header, actions and scrollable content.",
		category: C.code,
		deps: ["button", "tooltip"],
	}),
	aiItem({
		name: "code-block",
		title: "Code Block",
		description:
			"Syntax-highlighted code with header, copy, language select and line numbers. The canonical code block for the kit.",
		category: C.code,
		deps: ["button", "select"],
	}),
	aiItem({
		name: "commit",
		title: "Commit",
		description:
			"Commit summary: message, hash, author, timestamp and changed files.",
		category: C.code,
		deps: ["avatar", "button", "collapsible"],
	}),
	aiItem({
		name: "environment-variables",
		title: "Environment Variables",
		description:
			"Environment variable list with masked values, visibility switch and copy.",
		category: C.code,
		deps: ["badge", "button", "switch"],
	}),
	aiItem({
		name: "file-tree",
		title: "File Tree",
		description: "Expandable file and folder tree with selection.",
		category: C.code,
		deps: ["collapsible"],
	}),
	aiItem({
		name: "jsx-preview",
		title: "JSX Preview",
		description:
			"Live preview of streamed JSX or template markup that tolerates unclosed tags.",
		category: C.code,
	}),
	aiItem({
		name: "package-info",
		title: "Package Info",
		description: "Package name, version change and dependency list.",
		category: C.code,
		deps: ["badge"],
	}),
];

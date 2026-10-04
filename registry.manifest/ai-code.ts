import { aiItem, aiReact, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Code: board AI 05 authoring (Agent, Artifact, Code Block, Commit, Environment Variables, File Tree, JSX Preview, Package Info). */
export const items: Item[] = [
	aiItem({
		name: "agent",
		title: "Agent",
		description:
			"Agent configuration card: model, instructions, tools and output schema.",
		category: C.code,
		deps: ["accordion", "badge", "card", "ai-code-block", "elevation"],
		react: aiReact("agent", ["cn"]),
	}),
	aiItem({
		name: "artifact",
		title: "Artifact",
		description:
			"Container for generated output with a header, actions and scrollable content.",
		category: C.code,
		deps: ["button", "card", "tooltip", "elevation"],
		react: aiReact("artifact", ["cn"]),
	}),
	aiItem({
		name: "code-block",
		title: "Code Block",
		description:
			"Syntax-highlighted code with header, copy, language select and line numbers. The canonical code block for the kit.",
		category: C.code,
		deps: ["button", "select"],
		react: aiReact("code-block", ["cn", "shiki"]),
	}),
	aiItem({
		name: "commit",
		title: "Commit",
		description:
			"Commit summary: message, hash, author, timestamp and changed files.",
		category: C.code,
		deps: ["avatar", "badge", "button", "collapsible"],
		react: aiReact("commit", ["cn"]),
	}),
	aiItem({
		name: "environment-variables",
		title: "Environment Variables",
		description:
			"Environment variable list with masked values, visibility switch and copy.",
		category: C.code,
		deps: ["badge", "button", "switch"],
		react: aiReact("environment-variables", ["cn"]),
	}),
	aiItem({
		name: "file-tree",
		title: "File Tree",
		description: "Expandable file and folder tree with selection.",
		category: C.code,
		deps: ["collapsible"],
		react: aiReact("file-tree", ["cn"]),
	}),
	aiItem({
		name: "jsx-preview",
		title: "JSX Preview",
		description:
			"Live preview of streamed JSX or template markup that tolerates unclosed tags.",
		category: C.code,
		deps: ["alert"],
		react: aiReact("jsx-preview", ["cn", "react-jsx-parser"]),
	}),
	aiItem({
		name: "package-info",
		title: "Package Info",
		description: "Package name, version change and dependency list.",
		category: C.code,
		deps: ["badge"],
		react: aiReact("package-info", ["cn"]),
	}),
];

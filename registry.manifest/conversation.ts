import type { Item } from "./types.ts";

const base = ["@base-ui/react", "class-variance-authority", "cn"];

export const items: Item[] = [
	{
		name: "bubble",
		title: "Bubble",
		description:
			"Conversational content in a bubble: seven variants, start/end alignment, grouping and floating reactions.",
		type: "registry:ui",
		categories: ["Conversation"],
		registryDependencies: [],
		docs: "Replaces the stock bubble: `shadcn add @edmi-ui/bubble --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/bubble.tsx" }],
				dependencies: base,
			},
		},
	},
	{
		name: "message",
		title: "Message",
		description:
			"A chat row: avatar, header, content and footer, top-aligned and mirrored with `align`.",
		type: "registry:ui",
		categories: ["Conversation"],
		registryDependencies: [],
		docs: "Replaces the stock message: `shadcn add @edmi-ui/message --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/message.tsx" }],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "marker",
		title: "Marker",
		description:
			"Inline status, system note, bordered row or labeled separator inside a conversation.",
		type: "registry:ui",
		categories: ["Conversation"],
		registryDependencies: [],
		docs: "Replaces the stock marker: `shadcn add @edmi-ui/marker --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/marker.tsx" }],
				dependencies: base,
			},
		},
	},
	{
		name: "message-scroller",
		title: "Message Scroller",
		description:
			"The chat viewport: anchors each turn, follows streaming replies and offers Jump to latest.",
		type: "registry:ui",
		categories: ["Conversation"],
		registryDependencies: ["button"],
		docs: "Replaces the stock message-scroller: `shadcn add @edmi-ui/message-scroller --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/message-scroller.tsx" }],
				dependencies: ["@shadcn/react", "cn"],
			},
		},
	},
	{
		name: "questionnaire",
		title: "Questionnaire",
		description:
			"Multi-step questions with single, multiple, freeform and skippable answers and keyboard shortcuts.",
		type: "registry:ui",
		categories: ["Conversation"],
		registryDependencies: ["button"],
		docs: "Replaces the stock questionnaire: `shadcn add @edmi-ui/questionnaire --overwrite`.",
		frameworks: {
			react: {
				files: [{ path: "registry/ui/questionnaire.tsx" }],
				dependencies: ["@shadcn/react", "cn"],
			},
		},
	},
];

import type { Item } from "./types.ts";

/** ✦ Patterns, second half (worker react-patterns-2). Same category as ./patterns.ts. */
export const items: Item[] = [
	{
		name: "feed-post",
		title: "Feed Post",
		description:
			"Social post card: avatar header, body, attached index item and stat row.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["avatar", "button", "card", "item", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/feed-post`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/feed-post/feed-post.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "agent-card",
		title: "Agent Card",
		description:
			"AI agent card with a deterministic 5x5 identicon, badges and a stat row.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["badge", "card", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/agent-card`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/agent-card/agent-card.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "feature-row",
		title: "Feature Row",
		description:
			"Numbered feature row on a card with a trailing icon; expands when given content.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "collapsible", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/feature-row`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/feature-row/feature-row.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "step-card",
		title: "Step Card",
		description:
			"Numbered step card with a corner icon, title and description.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/step-card`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/step-card/step-card.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "pricing-plan",
		title: "Pricing Plan",
		description:
			"Plan card with title, price, call to action and a check list.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "separator", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/pricing-plan`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/pricing-plan/pricing-plan.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "task-list",
		title: "Task List",
		description:
			"Agent tasks grouped by status badge (ready to review, running, completed).",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["badge", "card", "separator", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/task-list`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/task-list/task-list.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "kanban-column",
		title: "Kanban Column",
		description: "Sunken stage column with a mono header and Card items.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/kanban-column`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/kanban-column/kanban-column.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "code-block",
		title: "Code Block",
		description:
			"Card with mono code, optional line highlight and a copy button.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["button", "card", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/code-block`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/code-block/code-block.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
	{
		name: "footer",
		title: "Footer",
		description:
			"Site footer: brand, link columns, social slot and legal line.",
		type: "registry:block",
		categories: ["Patterns"],
		registryDependencies: ["card", "separator", "elevation"],
		docs: "Composition block: `shadcn add @edmi-ui/footer`.",
		frameworks: {
			react: {
				files: [
					{
						path: "registry/blocks/footer/footer.tsx",
						type: "registry:component",
					},
				],
				dependencies: ["cn"],
			},
		},
	},
];

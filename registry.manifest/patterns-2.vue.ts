import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./patterns-2.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	"feed-post": {
		files: [
			{ path: "registry/ui/feed-post/FeedPost.vue" },
			{ path: "registry/ui/feed-post/FeedPostContent.vue" },
			{ path: "registry/ui/feed-post/FeedPostFooter.vue" },
			{ path: "registry/ui/feed-post/FeedPostHeader.vue" },
			{ path: "registry/ui/feed-post/FeedPostIndex.vue" },
			{ path: "registry/ui/feed-post/FeedPostStat.vue" },
			{ path: "registry/ui/feed-post/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	"agent-card": {
		files: [
			{ path: "registry/ui/agent-card/AgentCard.vue" },
			{ path: "registry/ui/agent-card/AgentIdenticon.vue" },
			{ path: "registry/ui/agent-card/index.ts" },
			{ path: "registry/ui/agent-card/types.ts" },
		],
	},
	"feature-row": {
		files: [
			{ path: "registry/ui/feature-row/FeatureRow.vue" },
			{ path: "registry/ui/feature-row/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	"step-card": {
		files: [
			{ path: "registry/ui/step-card/StepCard.vue" },
			{ path: "registry/ui/step-card/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	"pricing-plan": {
		files: [
			{ path: "registry/ui/pricing-plan/PricingPlan.vue" },
			{ path: "registry/ui/pricing-plan/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	"task-list": {
		files: [
			{ path: "registry/ui/task-list/TaskList.vue" },
			{ path: "registry/ui/task-list/index.ts" },
			{ path: "registry/ui/task-list/types.ts" },
		],
	},
	"kanban-column": {
		files: [
			{ path: "registry/ui/kanban-column/KanbanColumn.vue" },
			{ path: "registry/ui/kanban-column/KanbanItem.vue" },
			{ path: "registry/ui/kanban-column/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	"code-block": {
		files: [
			{ path: "registry/ui/code-block/CodeBlock.vue" },
			{ path: "registry/ui/code-block/index.ts" },
		],
		dependencies: ["@lucide/vue"],
	},
	footer: {
		files: [
			{ path: "registry/ui/footer/SiteFooter.vue" },
			{ path: "registry/ui/footer/index.ts" },
			{ path: "registry/ui/footer/types.ts" },
		],
	},
};

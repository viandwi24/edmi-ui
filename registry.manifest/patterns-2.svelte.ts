import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./patterns-2.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	"feed-post": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/feed-post/feed-post-content.svelte" },
			{ path: "src/lib/registry/ui/feed-post/feed-post-footer.svelte" },
			{ path: "src/lib/registry/ui/feed-post/feed-post-header.svelte" },
			{ path: "src/lib/registry/ui/feed-post/feed-post-index.svelte" },
			{ path: "src/lib/registry/ui/feed-post/feed-post-stat.svelte" },
			{ path: "src/lib/registry/ui/feed-post/feed-post.svelte" },
			{ path: "src/lib/registry/ui/feed-post/index.ts" },
		],
	},
	"agent-card": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/agent-card/agent-card.svelte" },
			{ path: "src/lib/registry/ui/agent-card/agent-identicon.svelte" },
			{ path: "src/lib/registry/ui/agent-card/index.ts" },
		],
	},
	"feature-row": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/feature-row/feature-row.svelte" },
			{ path: "src/lib/registry/ui/feature-row/index.ts" },
		],
	},
	"step-card": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/step-card/index.ts" },
			{ path: "src/lib/registry/ui/step-card/step-card.svelte" },
		],
	},
	"pricing-plan": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/pricing-plan/index.ts" },
			{ path: "src/lib/registry/ui/pricing-plan/pricing-plan.svelte" },
		],
	},
	"task-list": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/task-list/index.ts" },
			{ path: "src/lib/registry/ui/task-list/task-list.svelte" },
		],
	},
	"kanban-column": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/kanban-column/index.ts" },
			{ path: "src/lib/registry/ui/kanban-column/kanban-column.svelte" },
			{ path: "src/lib/registry/ui/kanban-column/kanban-item.svelte" },
		],
	},
	"code-block": {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/code-block/code-block.svelte" },
			{ path: "src/lib/registry/ui/code-block/index.ts" },
		],
	},
	footer: {
		type: "registry:ui",
		files: [
			{ path: "src/lib/registry/ui/footer/index.ts" },
			{ path: "src/lib/registry/ui/footer/site-footer.svelte" },
		],
	},
};

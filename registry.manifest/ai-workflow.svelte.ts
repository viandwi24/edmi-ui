import { aiSvelte } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.svelte` entries for items in ./ai-workflow.ts, keyed by item name (`ai-<name>`).
 * Dependencies are inferred by `shadcn-svelte registry build`; ui dependencies come from `registryDependencies`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-canvas": aiSvelte("canvas", ["canvas.svelte", "index.ts"]),
	"ai-node": aiSvelte("node", [
		"node.svelte",
		"node-action.svelte",
		"node-content.svelte",
		"node-description.svelte",
		"node-footer.svelte",
		"node-header.svelte",
		"node-title.svelte",
		"index.ts",
	]),
	"ai-edge": aiSvelte("edge", [
		"animated.svelte",
		"temporary.svelte",
		"index.ts",
	]),
	"ai-connection": aiSvelte("connection", ["connection.svelte", "index.ts"]),
	"ai-controls": aiSvelte("controls", ["controls.svelte", "index.ts"]),
	"ai-panel": aiSvelte("panel", ["panel.svelte", "index.ts"]),
	"ai-toolbar": aiSvelte("toolbar", ["toolbar.svelte", "index.ts"]),
	"ai-image": aiSvelte("image", ["image.svelte", "index.ts"]),
	"ai-open-in-chat": aiSvelte("open-in-chat", [
		"open-in.svelte",
		"open-in-chatgpt.svelte",
		"open-in-claude.svelte",
		"open-in-content.svelte",
		"open-in-cursor.svelte",
		"open-in-github.svelte",
		"open-in-item-link.svelte",
		"open-in-item.svelte",
		"open-in-label.svelte",
		"open-in-scira.svelte",
		"open-in-separator.svelte",
		"open-in-t3.svelte",
		"open-in-trigger.svelte",
		"open-in-v0.svelte",
		"context.ts",
		"providers.ts",
		"icons/chatgpt.svelte",
		"icons/claude.svelte",
		"icons/cursor.svelte",
		"icons/github.svelte",
		"icons/scira.svelte",
		"icons/t3.svelte",
		"icons/v0.svelte",
		"index.ts",
	]),
};

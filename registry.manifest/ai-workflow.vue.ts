import { aiVue } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.vue` entries for items in ./ai-workflow.ts, keyed by item name (`ai-<name>`).
 */
const flow = ["@vue-flow/core", "@vueuse/core"];

export const entries: Record<string, FrameworkEntry> = {
	"ai-canvas": aiVue(
		"canvas",
		["Canvas.vue"],
		["@vue-flow/core", "@vue-flow/background", "reka-ui"],
	),
	"ai-node": aiVue(
		"node",
		[
			"Node.vue",
			"NodeAction.vue",
			"NodeContent.vue",
			"NodeDescription.vue",
			"NodeFooter.vue",
			"NodeHeader.vue",
			"NodeTitle.vue",
		],
		flow,
	),
	"ai-edge": aiVue(
		"edge",
		["Animated.vue", "Temporary.vue"],
		["@vue-flow/core"],
	),
	"ai-connection": aiVue("connection", ["Connection.vue"], ["@vue-flow/core"]),
	"ai-controls": aiVue(
		"controls",
		["Controls.vue"],
		["@vue-flow/controls", "@vueuse/core"],
	),
	"ai-panel": aiVue("panel", ["Panel.vue"], flow),
	"ai-toolbar": aiVue(
		"toolbar",
		["Toolbar.vue"],
		["@vue-flow/core", "@vue-flow/node-toolbar", "@vueuse/core"],
	),
	"ai-image": aiVue("image", ["Image.vue"], ["ai"]),
	"ai-open-in-chat": aiVue(
		"open-in-chat",
		[
			"OpenIn.vue",
			"OpenInChatGPT.vue",
			"OpenInClaude.vue",
			"OpenInContent.vue",
			"OpenInCursor.vue",
			"OpenInGitHub.vue",
			"OpenInItem.vue",
			"OpenInItemLink.vue",
			"OpenInLabel.vue",
			"OpenInScira.vue",
			"OpenInSeparator.vue",
			"OpenInT3.vue",
			"OpenInTrigger.vue",
			"OpenInv0.vue",
			"context.ts",
			"providers.ts",
			"icons/ChatGPT.vue",
			"icons/Claude.vue",
			"icons/Cursor.vue",
			"icons/Github.vue",
			"icons/Scira.vue",
			"icons/V0.vue",
			"icons/index.ts",
		],
		["@lucide/vue", "@vueuse/core", "reka-ui"],
	),
};

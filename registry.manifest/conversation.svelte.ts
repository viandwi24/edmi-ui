import type { FrameworkEntry } from "./types.ts";

/** `frameworks.svelte` entries for items in ./conversation.ts, keyed by item name (owned by the svelte worker). */
export const entries: Record<string, FrameworkEntry> = {
	bubble: {
		files: [
			{ path: "src/lib/registry/ui/bubble/bubble-content.svelte" },
			{ path: "src/lib/registry/ui/bubble/bubble-group.svelte" },
			{ path: "src/lib/registry/ui/bubble/bubble-reaction.svelte" },
			{ path: "src/lib/registry/ui/bubble/bubble-reactions.svelte" },
			{ path: "src/lib/registry/ui/bubble/bubble.svelte" },
			{ path: "src/lib/registry/ui/bubble/index.ts" },
		],
	},
	message: {
		files: [
			{ path: "src/lib/registry/ui/message/message-avatar.svelte" },
			{ path: "src/lib/registry/ui/message/message-content.svelte" },
			{ path: "src/lib/registry/ui/message/message-footer.svelte" },
			{ path: "src/lib/registry/ui/message/message-group.svelte" },
			{ path: "src/lib/registry/ui/message/message-header.svelte" },
			{ path: "src/lib/registry/ui/message/message.svelte" },
			{ path: "src/lib/registry/ui/message/index.ts" },
		],
	},
	marker: {
		files: [
			{ path: "src/lib/registry/ui/marker/marker-content.svelte" },
			{ path: "src/lib/registry/ui/marker/marker-icon.svelte" },
			{ path: "src/lib/registry/ui/marker/marker.svelte" },
			{ path: "src/lib/registry/ui/marker/index.ts" },
		],
	},
	"message-scroller": {
		files: [
			{
				path: "src/lib/registry/ui/message-scroller/message-scroller-button.svelte",
			},
			{
				path: "src/lib/registry/ui/message-scroller/message-scroller-content.svelte",
			},
			{
				path: "src/lib/registry/ui/message-scroller/message-scroller-item.svelte",
			},
			{
				path: "src/lib/registry/ui/message-scroller/message-scroller-provider.svelte",
			},
			{
				path: "src/lib/registry/ui/message-scroller/message-scroller-viewport.svelte",
			},
			{ path: "src/lib/registry/ui/message-scroller/message-scroller.svelte" },
			{
				path: "src/lib/registry/ui/message-scroller/use-message-scroller.svelte.ts",
			},
			{ path: "src/lib/registry/ui/message-scroller/index.ts" },
		],
	},
	questionnaire: {
		files: [
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-actions.svelte",
			},
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-choice-description.svelte",
			},
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-choice.svelte" },
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-choices.svelte",
			},
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-description.svelte",
			},
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-error.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-input.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-item.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-next.svelte" },
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-previous.svelte",
			},
			{
				path: "src/lib/registry/ui/questionnaire/questionnaire-progress.svelte",
			},
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-skip.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-submit.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire-title.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/questionnaire.svelte" },
			{ path: "src/lib/registry/ui/questionnaire/use-questionnaire.svelte.ts" },
			{ path: "src/lib/registry/ui/questionnaire/index.ts" },
		],
	},
};

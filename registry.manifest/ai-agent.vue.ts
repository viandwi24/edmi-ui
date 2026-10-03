import { aiVue } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.vue` entries for items in ./ai-agent.ts, keyed by item name (`ai-<name>`).
 * Files live in `registry/components/ai/<name>/` and install to `components/ai/<name>/`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-reasoning": aiVue(
		"reasoning",
		[
			"Reasoning.vue",
			"ReasoningContent.vue",
			"ReasoningTrigger.vue",
			"context.ts",
		],
		["@lucide/vue", "@vueuse/core", "vue-stream-markdown"],
	),
	"ai-chain-of-thought": aiVue(
		"chain-of-thought",
		[
			"ChainOfThought.vue",
			"ChainOfThoughtContent.vue",
			"ChainOfThoughtHeader.vue",
			"ChainOfThoughtImage.vue",
			"ChainOfThoughtSearchResult.vue",
			"ChainOfThoughtSearchResults.vue",
			"ChainOfThoughtStep.vue",
			"context.ts",
		],
		["@lucide/vue", "@vueuse/core"],
	),
	"ai-tool": aiVue(
		"tool",
		[
			"Tool.vue",
			"ToolContent.vue",
			"ToolHeader.vue",
			"ToolInput.vue",
			"ToolOutput.vue",
			"ToolStatusBadge.vue",
		],
		["ai", "@lucide/vue", "reka-ui"],
	),
	"ai-confirmation": aiVue(
		"confirmation",
		[
			"Confirmation.vue",
			"ConfirmationAccepted.vue",
			"ConfirmationAction.vue",
			"ConfirmationActions.vue",
			"ConfirmationDescription.vue",
			"ConfirmationRejected.vue",
			"ConfirmationRequest.vue",
			"ConfirmationTitle.vue",
			"context.ts",
		],
		["ai", "@lucide/vue"],
	),
	"ai-sources": aiVue(
		"sources",
		["Source.vue", "Sources.vue", "SourcesContent.vue", "SourcesTrigger.vue"],
		["@lucide/vue", "reka-ui"],
	),
	"ai-inline-citation": aiVue(
		"inline-citation",
		[
			"InlineCitation.vue",
			"InlineCitationCard.vue",
			"InlineCitationCardBody.vue",
			"InlineCitationCardTrigger.vue",
			"InlineCitationCarousel.vue",
			"InlineCitationCarouselContent.vue",
			"InlineCitationCarouselHeader.vue",
			"InlineCitationCarouselIndex.vue",
			"InlineCitationCarouselItem.vue",
			"InlineCitationCarouselNext.vue",
			"InlineCitationCarouselPrev.vue",
			"InlineCitationQuote.vue",
			"InlineCitationSource.vue",
			"InlineCitationText.vue",
		],
		["@lucide/vue", "reka-ui"],
	),
	"ai-plan": aiVue(
		"plan",
		[
			"Plan.vue",
			"PlanAction.vue",
			"PlanContent.vue",
			"PlanDescription.vue",
			"PlanFooter.vue",
			"PlanHeader.vue",
			"PlanTitle.vue",
			"PlanTrigger.vue",
			"context.ts",
		],
		["@lucide/vue", "reka-ui"],
	),
	"ai-task": aiVue(
		"task",
		[
			"Task.vue",
			"TaskContent.vue",
			"TaskItem.vue",
			"TaskItemFile.vue",
			"TaskTrigger.vue",
		],
		["@lucide/vue", "reka-ui"],
	),
	"ai-queue": aiVue(
		"queue",
		[
			"Queue.vue",
			"QueueItem.vue",
			"QueueItemAction.vue",
			"QueueItemActions.vue",
			"QueueItemAttachment.vue",
			"QueueItemContent.vue",
			"QueueItemDescription.vue",
			"QueueItemFile.vue",
			"QueueItemImage.vue",
			"QueueItemIndicator.vue",
			"QueueList.vue",
			"QueueSection.vue",
			"QueueSectionContent.vue",
			"QueueSectionLabel.vue",
			"QueueSectionTrigger.vue",
			"types.ts",
		],
		["@lucide/vue", "reka-ui"],
	),
	"ai-checkpoint": aiVue(
		"checkpoint",
		["Checkpoint.vue", "CheckpointIcon.vue", "CheckpointTrigger.vue"],
		["@lucide/vue"],
	),
};

import type { FrameworkEntry } from "./types.ts";

/** `frameworks.vue` entries for items in ./conversation.ts, keyed by item name (owned by the vue worker). */
export const entries: Record<string, FrameworkEntry> = {
	bubble: {
		files: [
			{ path: "registry/ui/bubble/Bubble.vue" },
			{ path: "registry/ui/bubble/BubbleContent.vue" },
			{ path: "registry/ui/bubble/BubbleGroup.vue" },
			{ path: "registry/ui/bubble/BubbleReaction.vue" },
			{ path: "registry/ui/bubble/BubbleReactions.vue" },
			{ path: "registry/ui/bubble/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority"],
	},
	message: {
		files: [
			{ path: "registry/ui/message/Message.vue" },
			{ path: "registry/ui/message/MessageAvatar.vue" },
			{ path: "registry/ui/message/MessageContent.vue" },
			{ path: "registry/ui/message/MessageFooter.vue" },
			{ path: "registry/ui/message/MessageGroup.vue" },
			{ path: "registry/ui/message/MessageHeader.vue" },
			{ path: "registry/ui/message/index.ts" },
		],
		dependencies: ["reka-ui"],
	},
	marker: {
		files: [
			{ path: "registry/ui/marker/Marker.vue" },
			{ path: "registry/ui/marker/MarkerContent.vue" },
			{ path: "registry/ui/marker/MarkerIcon.vue" },
			{ path: "registry/ui/marker/index.ts" },
		],
		dependencies: ["reka-ui", "class-variance-authority"],
	},
	"message-scroller": {
		files: [
			{ path: "registry/ui/message-scroller/MessageScroller.vue" },
			{ path: "registry/ui/message-scroller/MessageScrollerButton.vue" },
			{ path: "registry/ui/message-scroller/MessageScrollerContent.vue" },
			{ path: "registry/ui/message-scroller/MessageScrollerItem.vue" },
			{ path: "registry/ui/message-scroller/MessageScrollerProvider.vue" },
			{ path: "registry/ui/message-scroller/MessageScrollerViewport.vue" },
			{ path: "registry/ui/message-scroller/useMessageScroller.ts" },
			{ path: "registry/ui/message-scroller/index.ts" },
		],
		dependencies: [],
	},
	questionnaire: {
		files: [
			{ path: "registry/ui/questionnaire/Questionnaire.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireActions.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireChoice.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireChoiceDescription.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireChoices.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireDescription.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireError.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireInput.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireItem.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireNext.vue" },
			{ path: "registry/ui/questionnaire/QuestionnairePrevious.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireProgress.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireSkip.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireSubmit.vue" },
			{ path: "registry/ui/questionnaire/QuestionnaireTitle.vue" },
			{ path: "registry/ui/questionnaire/useQuestionnaire.ts" },
			{ path: "registry/ui/questionnaire/index.ts" },
		],
		dependencies: ["reka-ui"],
	},
};

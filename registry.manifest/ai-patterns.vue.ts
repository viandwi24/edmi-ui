import { aiVue } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.vue` entries for items in ./ai-patterns.ts, keyed by item name (`ai-<name>`).
 * Files live in `registry/components/ai/<name>/` and install to `components/ai/<name>/`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-artifact-card": aiVue(
		"artifact-card",
		[
			"ArtifactCard.vue",
			"ArtifactCardActions.vue",
			"ArtifactCardBody.vue",
			"ArtifactCardIcon.vue",
			"ArtifactCardMeta.vue",
			"ArtifactCardThumbnail.vue",
			"ArtifactCardTitle.vue",
			"ArtifactKindIcon.vue",
			"context.ts",
		],
		["@lucide/vue"],
	),
	"ai-artifact-stack": aiVue(
		"artifact-stack",
		["ArtifactStack.vue", "ArtifactStackDownloadAll.vue"],
		["@lucide/vue"],
	),
	"ai-artifact-viewer": aiVue(
		"artifact-viewer",
		[
			"ArtifactViewer.vue",
			"ArtifactViewerAction.vue",
			"ArtifactViewerClose.vue",
			"ArtifactViewerContent.vue",
			"ArtifactViewerDownload.vue",
			"ArtifactViewerExpand.vue",
			"ArtifactViewerHeader.vue",
			"ArtifactViewerOpenIn.vue",
			"ArtifactViewerPaper.vue",
			"ArtifactViewerTitle.vue",
		],
		["@lucide/vue"],
	),
	"ai-session-panel": aiVue(
		"session-panel",
		[
			"SessionFile.vue",
			"SessionOutputPreview.vue",
			"SessionOutputTitle.vue",
			"SessionPanel.vue",
			"SessionPanelDivider.vue",
			"SessionProgress.vue",
			"SessionSection.vue",
			"SessionSource.vue",
			"types.ts",
		],
		["@lucide/vue"],
	),
	"ai-agent-avatar": aiVue(
		"agent-avatar",
		["AgentAvatar.vue", "identicon.ts"],
		[],
	),
	"ai-prompt-input-agent": aiVue(
		"prompt-input-agent",
		[
			"PromptInputAgent.vue",
			"PromptInputAgentMentions.vue",
			"types.ts",
			"useAgentMention.ts",
		],
		[],
	),
	"ai-chat-composer": aiVue(
		"chat-composer",
		["ChatComposer.vue", "types.ts"],
		["ai", "@lucide/vue", "@vueuse/core"],
	),
	"ai-chat-header": aiVue(
		"chat-header",
		[
			"ChatHeader.vue",
			"ChatHeaderActions.vue",
			"ChatHeaderMenu.vue",
			"ChatHeaderProject.vue",
			"ChatHeaderShare.vue",
			"ChatHeaderTitle.vue",
		],
		["@lucide/vue"],
	),
};

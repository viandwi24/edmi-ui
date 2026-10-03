import { aiSvelte } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.svelte` entries for items in ./ai-patterns.ts, keyed by item name (`ai-<name>`).
 * Sources live in `src/lib/registry/ai/<name>/` and install to `$lib/components/ai/<name>/`; `dependencies`
 * are inferred by `shadcn-svelte registry build`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-artifact-card": aiSvelte("artifact-card", [
		"artifact-card-actions.svelte",
		"artifact-card-body.svelte",
		"artifact-card-icon.svelte",
		"artifact-card-meta.svelte",
		"artifact-card-thumbnail.svelte",
		"artifact-card-title.svelte",
		"artifact-card.svelte",
		"artifact-kind-icon.svelte",
		"index.ts",
		"use-artifact-card.svelte.ts",
	]),
	"ai-artifact-stack": aiSvelte("artifact-stack", [
		"artifact-stack-download-all.svelte",
		"artifact-stack.svelte",
		"index.ts",
	]),
	"ai-artifact-viewer": aiSvelte("artifact-viewer", [
		"artifact-viewer-action.svelte",
		"artifact-viewer-close.svelte",
		"artifact-viewer-content.svelte",
		"artifact-viewer-download.svelte",
		"artifact-viewer-expand.svelte",
		"artifact-viewer-header.svelte",
		"artifact-viewer-open-in.svelte",
		"artifact-viewer-paper.svelte",
		"artifact-viewer-title.svelte",
		"artifact-viewer.svelte",
		"index.ts",
	]),
	"ai-session-panel": aiSvelte("session-panel", [
		"index.ts",
		"session-file.svelte",
		"session-output-preview.svelte",
		"session-output-title.svelte",
		"session-panel-divider.svelte",
		"session-panel.svelte",
		"session-progress.svelte",
		"session-section.svelte",
		"session-source.svelte",
		"types.ts",
	]),
	"ai-agent-avatar": aiSvelte("agent-avatar", [
		"agent-avatar.svelte",
		"identicon.ts",
		"index.ts",
	]),
	"ai-prompt-input-agent": aiSvelte("prompt-input-agent", [
		"index.ts",
		"prompt-input-agent-mentions.svelte",
		"prompt-input-agent.svelte",
		"types.ts",
		"use-agent-mention.svelte.ts",
	]),
	"ai-chat-composer": aiSvelte("chat-composer", [
		"chat-composer.svelte",
		"index.ts",
		"types.ts",
	]),
	"ai-chat-header": aiSvelte("chat-header", [
		"chat-header-actions.svelte",
		"chat-header-menu.svelte",
		"chat-header-project.svelte",
		"chat-header-share.svelte",
		"chat-header-title.svelte",
		"chat-header.svelte",
		"index.ts",
	]),
};

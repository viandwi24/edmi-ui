import { aiSvelte } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.svelte` entries for items in ./ai-voice.ts, keyed by item name (`ai-<name>`).
 * Dependencies are inferred by `shadcn-svelte registry build` (dynamic imports need an explicit `dependencies`); ui dependencies come from `registryDependencies`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-audio-player": {
		...aiSvelte("audio-player", [
			"audio-player-control-bar.svelte",
			"audio-player-duration-display.svelte",
			"audio-player-element.svelte",
			"audio-player-mute-button.svelte",
			"audio-player-play-button.svelte",
			"audio-player-seek-backward-button.svelte",
			"audio-player-seek-forward-button.svelte",
			"audio-player-time-display.svelte",
			"audio-player-time-range.svelte",
			"audio-player-volume-range.svelte",
			"audio-player.svelte",
			"index.ts",
		]),
		// Registered at runtime through a dynamic import, which the builder does not infer.
		dependencies: ["media-chrome@^4.19.3"],
	},
	"ai-mic-selector": aiSvelte("mic-selector", [
		"mic-selector-content.svelte",
		"mic-selector-empty.svelte",
		"mic-selector-input.svelte",
		"mic-selector-item.svelte",
		"mic-selector-label.svelte",
		"mic-selector-list.svelte",
		"mic-selector-trigger.svelte",
		"mic-selector-value.svelte",
		"mic-selector.svelte",
		"use-audio-devices.svelte.ts",
		"use-mic-selector.svelte.ts",
		"index.ts",
	]),
	"ai-persona": aiSvelte("persona", [
		"persona.svelte",
		"sources.ts",
		"index.ts",
	]),
	"ai-speech-input": aiSvelte("speech-input", [
		"speech-input.svelte",
		"index.ts",
	]),
	"ai-transcription": aiSvelte("transcription", [
		"transcription-segment.svelte",
		"transcription.svelte",
		"use-transcription.svelte.ts",
		"index.ts",
	]),
	"ai-voice-selector": aiSvelte("voice-selector", [
		"use-voice-selector.svelte.ts",
		"voice-selector-accent.svelte",
		"voice-selector-age.svelte",
		"voice-selector-attributes.svelte",
		"voice-selector-bullet.svelte",
		"voice-selector-content.svelte",
		"voice-selector-description.svelte",
		"voice-selector-details.svelte",
		"voice-selector-dialog.svelte",
		"voice-selector-empty.svelte",
		"voice-selector-gender.svelte",
		"voice-selector-group.svelte",
		"voice-selector-header.svelte",
		"voice-selector-input.svelte",
		"voice-selector-item.svelte",
		"voice-selector-list.svelte",
		"voice-selector-name.svelte",
		"voice-selector-preview.svelte",
		"voice-selector-separator.svelte",
		"voice-selector-shortcut.svelte",
		"voice-selector-trigger.svelte",
		"voice-selector.svelte",
		"index.ts",
	]),
};

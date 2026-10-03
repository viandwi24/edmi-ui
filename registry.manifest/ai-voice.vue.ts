import { aiVue } from "./ai-shared.ts";
import type { FrameworkEntry } from "./types.ts";

/**
 * `frameworks.vue` entries for items in ./ai-voice.ts, keyed by item name (`ai-<name>`).
 * Files live in `registry/components/ai/<name>/` and install to `components/ai/<name>/`.
 */
export const entries: Record<string, FrameworkEntry> = {
	"ai-audio-player": aiVue(
		"audio-player",
		[
			"AudioPlayer.vue",
			"AudioPlayerControlBar.vue",
			"AudioPlayerDurationDisplay.vue",
			"AudioPlayerElement.vue",
			"AudioPlayerMuteButton.vue",
			"AudioPlayerPlayButton.vue",
			"AudioPlayerSeekBackwardButton.vue",
			"AudioPlayerSeekForwardButton.vue",
			"AudioPlayerTimeDisplay.vue",
			"AudioPlayerTimeRange.vue",
			"AudioPlayerVolumeRange.vue",
		],
		["media-chrome", "ai"],
	),
	"ai-mic-selector": aiVue(
		"mic-selector",
		[
			"MicSelector.vue",
			"MicSelectorContent.vue",
			"MicSelectorEmpty.vue",
			"MicSelectorInput.vue",
			"MicSelectorItem.vue",
			"MicSelectorLabel.vue",
			"MicSelectorList.vue",
			"MicSelectorTrigger.vue",
			"MicSelectorValue.vue",
			"context.ts",
			"useAudioDevices.ts",
		],
		["@vueuse/core", "@lucide/vue", "reka-ui"],
	),
	"ai-persona": aiVue(
		"persona",
		["Persona.vue", "sources.ts"],
		["@rive-app/webgl2", "@vueuse/core"],
	),
	"ai-speech-input": aiVue(
		"speech-input",
		["SpeechInput.vue"],
		["@lucide/vue"],
	),
	"ai-transcription": aiVue(
		"transcription",
		["Transcription.vue", "TranscriptionSegment.vue", "context.ts"],
		["@vueuse/core", "ai"],
	),
	"ai-voice-selector": aiVue(
		"voice-selector",
		[
			"VoiceSelector.vue",
			"VoiceSelectorAccent.vue",
			"VoiceSelectorAge.vue",
			"VoiceSelectorAttributes.vue",
			"VoiceSelectorBullet.vue",
			"VoiceSelectorContent.vue",
			"VoiceSelectorDescription.vue",
			"VoiceSelectorDetails.vue",
			"VoiceSelectorDialog.vue",
			"VoiceSelectorEmpty.vue",
			"VoiceSelectorGender.vue",
			"VoiceSelectorGroup.vue",
			"VoiceSelectorHeader.vue",
			"VoiceSelectorInput.vue",
			"VoiceSelectorItem.vue",
			"VoiceSelectorList.vue",
			"VoiceSelectorName.vue",
			"VoiceSelectorPreview.vue",
			"VoiceSelectorSeparator.vue",
			"VoiceSelectorShortcut.vue",
			"VoiceSelectorTrigger.vue",
			"context.ts",
		],
		["@vueuse/core", "@lucide/vue", "reka-ui"],
	),
};

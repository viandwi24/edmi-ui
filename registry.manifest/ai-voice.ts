import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Voice: board AI 07 (Audio Player, Mic Selector, Persona, Speech Input, Transcription, Voice Selector). */
export const items: Item[] = [
	aiItem({
		name: "audio-player",
		title: "Audio Player",
		description:
			"Audio player on media-chrome: play, seek, time, mute and volume.",
		category: C.voice,
		deps: ["button", "button-group"],
	}),
	aiItem({
		name: "mic-selector",
		title: "Mic Selector",
		description: "Microphone picker in a popover with a live level meter.",
		category: C.voice,
		deps: ["button", "command", "popover"],
		optionalDeps: ["ai-use-controllable-state"],
	}),
	aiItem({
		name: "persona",
		title: "Persona",
		description:
			"Animated agent persona (Rive) reacting to idle, listening, thinking, speaking and asleep states.",
		category: C.voice,
	}),
	aiItem({
		name: "speech-input",
		title: "Speech Input",
		description:
			"Dictation button using the Web Speech API with a listening and processing state.",
		category: C.voice,
		deps: ["button", "spinner"],
	}),
	aiItem({
		name: "transcription",
		title: "Transcription",
		description:
			"Transcript segments that highlight with audio playback and seek on click.",
		category: C.voice,
		optionalDeps: ["ai-use-controllable-state"],
	}),
	aiItem({
		name: "voice-selector",
		title: "Voice Selector",
		description:
			"Voice picker dialog with search, gender and accent filters and preview.",
		category: C.voice,
		deps: ["button", "command", "dialog", "spinner"],
		optionalDeps: ["ai-use-controllable-state"],
	}),
];

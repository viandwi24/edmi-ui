import { aiItem, aiReact, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Voice: board AI 07 (Audio Player, Mic Selector, Persona, Speech Input, Transcription, Voice Selector). */
export const items: Item[] = [
	aiItem({
		name: "audio-player",
		title: "Audio Player",
		description:
			"Audio player on media-chrome: play, seek, time, mute and volume, styled as an Edmi card with Edmi buttons.",
		category: C.voice,
		deps: ["button"],
		react: aiReact("audio-player", ["ai", "cn", "media-chrome"]),
	}),
	aiItem({
		name: "mic-selector",
		title: "Mic Selector",
		description:
			"Microphone picker: outline trigger, searchable popover list, cleaned-up device names with the hardware id muted.",
		category: C.voice,
		deps: ["button", "command", "popover"],
		optionalDeps: ["ai-use-controllable-state"],
		react: aiReact("mic-selector", ["cn"]),
	}),
	aiItem({
		name: "persona",
		title: "Persona",
		description:
			"Animated agent persona (Rive) reacting to idle, listening, thinking, speaking and asleep states.",
		category: C.voice,
		react: aiReact("persona", ["@rive-app/react-webgl2", "cn"]),
	}),
	aiItem({
		name: "speech-input",
		title: "Speech Input",
		description:
			"Dictation button using the Web Speech API (MediaRecorder fallback) with listening and processing states; supports raised.",
		category: C.voice,
		deps: ["button", "spinner"],
		react: aiReact("speech-input", ["cn"]),
	}),
	aiItem({
		name: "transcription",
		title: "Transcription",
		description:
			"Time-synced transcript: the active segment is highlighted, past is muted, future is dimmed, click a segment to seek.",
		category: C.voice,
		optionalDeps: ["ai-use-controllable-state"],
		react: aiReact("transcription", ["ai", "cn"]),
	}),
	aiItem({
		name: "voice-selector",
		title: "Voice Selector",
		description:
			"Voice picker dialog with search, grouped voices, attributes, descriptions and a preview play button.",
		category: C.voice,
		deps: ["button", "command", "dialog", "spinner"],
		optionalDeps: ["ai-use-controllable-state"],
		react: aiReact("voice-selector", ["cn"]),
	}),
];

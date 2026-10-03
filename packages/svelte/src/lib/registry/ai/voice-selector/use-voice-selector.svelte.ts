// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { getContext, setContext } from "svelte";

/** Getter object so consumers stay reactive when the props change. */
export interface VoiceSelectorContext {
	readonly value: string | undefined;
	setValue: (value: string | undefined) => void;
	setOpen: (open: boolean) => void;
}

const KEY = Symbol("ai-voice-selector");

export function setVoiceSelectorContext(value: VoiceSelectorContext) {
	return setContext(KEY, value);
}

export function useVoiceSelector(): VoiceSelectorContext {
	const context = getContext<VoiceSelectorContext | undefined>(KEY);
	if (!context) {
		throw new Error("VoiceSelector components must be used within VoiceSelector");
	}
	return context;
}

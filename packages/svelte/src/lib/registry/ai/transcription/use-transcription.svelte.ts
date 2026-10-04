import type { Experimental_TranscriptionResult as TranscriptionResult } from "ai";
import { getContext, setContext } from "svelte";

export type TranscriptionSegment = NonNullable<
	TranscriptionResult["segments"]
>[number];

/** Getter object so consumers stay reactive when the props change. */
export interface TranscriptionContext {
	readonly segments: TranscriptionSegment[];
	readonly currentTime: number;
	/** Present only when the consumer passes `onSeek`; segments are clickable then. */
	readonly onSeek: ((time: number) => void) | undefined;
}

const KEY = Symbol("ai-transcription");

export function setTranscriptionContext(value: TranscriptionContext) {
	return setContext(KEY, value);
}

export function useTranscription(): TranscriptionContext {
	const context = getContext<TranscriptionContext | undefined>(KEY);
	if (!context) {
		throw new Error(
			"Transcription components must be used within Transcription",
		);
	}
	return context;
}

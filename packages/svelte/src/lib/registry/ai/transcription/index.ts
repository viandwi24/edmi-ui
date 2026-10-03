import Root from "./transcription.svelte";
import Segment from "./transcription-segment.svelte";

export {
	Root,
	//
	Root as Transcription,
	Segment,
	Segment as TranscriptionSegment,
};
export type { TranscriptionSegment as TranscriptionSegmentData } from "./use-transcription.svelte.js";

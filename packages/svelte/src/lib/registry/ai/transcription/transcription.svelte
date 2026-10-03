<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setTranscriptionContext, type TranscriptionSegment } from "./use-transcription.svelte.js";

	let {
		segments,
		currentTime = $bindable(0),
		onSeek,
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
		segments: TranscriptionSegment[];
		/** Seconds; `bind:currentTime` to follow an audio element. */
		currentTime?: number;
		onSeek?: (time: number) => void;
		/** Receives each segment and its index: `{#snippet children(segment, index)}`. */
		children: Snippet<[TranscriptionSegment, number]>;
	} = $props();

	setTranscriptionContext({
		get segments() {
			return segments;
		},
		get currentTime() {
			return currentTime;
		},
		get onSeek() {
			return onSeek
				? (time: number) => {
						currentTime = time;
						onSeek(time);
					}
				: undefined;
		},
	});
</script>

<div
	data-slot="ai-transcription"
	class={cn("flex flex-wrap gap-x-1 gap-y-0.5 text-[15px] leading-[1.9]", className)}
	{...restProps}
>
	{#each segments as segment, index (`${segment.startSecond}-${segment.endSecond}-${index}`)}
		{#if segment.text.trim()}
			{@render children(segment, index)}
		{/if}
	{/each}
</div>

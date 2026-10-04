<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { type TranscriptionSegment, useTranscription } from "./use-transcription.svelte.js";

	// States: past (--muted-foreground), active (--primary fill), future (--muted-foreground-2).
	let {
		segment,
		index,
		class: className,
		onclick,
		...restProps
	}: Omit<HTMLButtonAttributes, "children"> & {
		segment: TranscriptionSegment;
		index: number;
	} = $props();

	const ctx = useTranscription();
	const isActive = $derived(
		ctx.currentTime >= segment.startSecond && ctx.currentTime < segment.endSecond
	);
	const isPast = $derived(ctx.currentTime >= segment.endSecond);
</script>

<button
	type="button"
	data-slot="ai-transcription-segment"
	data-active={isActive}
	data-index={index}
	class={cn(
		"inline rounded px-[3px] py-0.5 text-left transition-colors",
		isActive && "bg-primary text-primary-foreground",
		isPast && "text-muted-foreground",
		!(isActive || isPast) && "text-muted-foreground-2",
		ctx.onSeek && !isActive && "cursor-pointer hover:text-foreground",
		!ctx.onSeek && "cursor-default",
		className
	)}
	onclick={(event) => {
		ctx.onSeek?.(segment.startSecond);
		onclick?.(event);
	}}
	{...restProps}
>
	{segment.text}
</button>

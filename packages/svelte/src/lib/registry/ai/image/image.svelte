<script lang="ts">
	import type { Experimental_GeneratedImage } from "ai";
	import type { HTMLImgAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	/** AI SDK generated image as a responsive img (base64 + media type). Loading state belongs to the parent. */
	let {
		ref = $bindable(null),
		base64,
		uint8Array: _uint8Array,
		mediaType,
		alt,
		class: className,
		...restProps
	}: Partial<Experimental_GeneratedImage> &
		HTMLImgAttributes & {
			ref?: HTMLImageElement | null;
			base64: string;
			mediaType: string;
		} = $props();
</script>

<img
	bind:this={ref}
	data-slot="ai-image"
	{alt}
	class={cn("h-auto max-w-full overflow-hidden rounded-xl border border-border", className)}
	src={`data:${mediaType};base64,${base64}`}
	{...restProps}
/>

<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<media-volume-range
	data-slot="ai-audio-player-volume-range"
	class={cn("h-7 w-[70px] px-1", className)}
	{...restProps}
>
	{@render children?.()}
</media-volume-range>

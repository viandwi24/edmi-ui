<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<media-time-range
	data-slot="ai-audio-player-time-range"
	class={cn("h-7 min-w-0 flex-1 px-1", className)}
	{...restProps}
>
	{@render children?.()}
</media-time-range>

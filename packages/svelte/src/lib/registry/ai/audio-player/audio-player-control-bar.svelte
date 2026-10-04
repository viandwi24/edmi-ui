<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<media-control-bar
	data-slot="ai-audio-player-control-bar"
	class={cn("flex w-full items-center gap-2", className)}
	{...restProps}
>
	{@render children?.()}
</media-control-bar>

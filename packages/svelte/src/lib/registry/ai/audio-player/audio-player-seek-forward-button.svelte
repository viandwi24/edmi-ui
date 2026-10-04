<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		seekOffset = 10,
		children,
		...restProps
	}: HTMLAttributes<HTMLElement> & { seekOffset?: number } = $props();
</script>

<media-seek-forward-button
	data-slot="ai-audio-player-seek-forward-button"
	seekoffset={seekOffset}
	class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}
	{...restProps}
>
	{@render children?.()}
</media-seek-forward-button>

<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
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

<media-seek-backward-button
	data-slot="ai-audio-player-seek-backward-button"
	seekoffset={seekOffset}
	class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}
	{...restProps}
>
	{@render children?.()}
</media-seek-backward-button>

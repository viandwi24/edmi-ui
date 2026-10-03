<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLElement> = $props();
</script>

<media-play-button
	data-slot="ai-audio-player-play-button"
	class={cn(buttonVariants({ variant: "default", size: "icon" }), "rounded-full", className)}
	{...restProps}
>
	{@render children?.()}
</media-play-button>

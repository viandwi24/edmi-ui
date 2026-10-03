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

<media-mute-button
	data-slot="ai-audio-player-mute-button"
	class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}
	{...restProps}
>
	{@render children?.()}
</media-mute-button>

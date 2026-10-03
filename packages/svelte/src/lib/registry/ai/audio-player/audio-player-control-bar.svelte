<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
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

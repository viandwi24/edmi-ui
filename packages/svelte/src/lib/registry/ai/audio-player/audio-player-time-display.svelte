<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<media-time-display
	data-slot="ai-audio-player-time-display"
	class={cn("font-mono text-xs text-foreground tabular-nums [--media-font:var(--font-mono)]", className)}
	{...restProps}
>
	{@render children?.()}
</media-time-display>

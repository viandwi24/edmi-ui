<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<media-duration-display
	data-slot="ai-audio-player-duration-display"
	class={cn("font-mono text-xs text-muted-foreground tabular-nums [--media-font:var(--font-mono)] [--media-text-color:var(--muted-foreground)]", className)}
	{...restProps}
>
	{@render children?.()}
</media-duration-display>

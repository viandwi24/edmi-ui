<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<!-- Large preview of the main output (render the document, slide or image inside). -->
<div
	bind:this={ref}
	data-slot="ai-session-output-preview"
	class={cn(
		"h-[150px] overflow-hidden rounded-[var(--radius)] border border-border bg-muted",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

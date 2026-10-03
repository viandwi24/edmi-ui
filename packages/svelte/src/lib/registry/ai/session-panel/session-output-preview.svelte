<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- Large preview of the main output (render the document, slide or image inside). -->
<div
	data-slot="ai-session-output-preview"
	class={cn(
		"h-[150px] overflow-hidden rounded-[var(--radius)] border border-border bg-muted",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		format,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & {
		/** Format shown after the title in mono (`PDF`). */
		format?: string;
	} = $props();
</script>

<span
	data-slot="ai-artifact-viewer-title"
	class={cn("min-w-0 flex-1 truncate text-sm", className)}
	{...restProps}
>
	{@render children?.()}
	{#if format}
		<span class="font-mono text-muted-foreground"> · {format}</span>
	{/if}
</span>

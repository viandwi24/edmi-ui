<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		format,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {
		/** Format shown after the title in mono (`PDF`). */
		format?: string | Snippet;
	} = $props();
</script>

<span
	bind:this={ref}
	data-slot="ai-artifact-viewer-title"
	class={cn("min-w-0 flex-1 truncate text-sm", className)}
	{...restProps}
>
	{@render children?.()}
	{#if format}
		<span class="font-mono text-muted-foreground"> · {#if typeof format === "string"}{format}{:else}{@render format()}{/if}</span>
	{/if}
</span>

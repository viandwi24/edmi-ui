<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<!-- A white page, in light and dark mode alike (DESIGN 5b rule 5). -->
<div
	bind:this={ref}
	data-slot="ai-artifact-viewer-paper"
	class={cn(
		"w-full rounded-[calc(var(--radius)*0.6)] border border-border bg-white px-10 py-[34px] text-[#1f1f1d]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

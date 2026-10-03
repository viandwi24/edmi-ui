<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { getProgressPercent } from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();

	const percent = getProgressPercent();
</script>

<span
	bind:this={ref}
	data-slot="progress-value"
	class={cn(
		"ml-auto font-mono text-[13px] text-muted-foreground tabular-nums",
		className
	)}
	{...restProps}
>
	{#if children}{@render children()}{:else if percent() != null}{percent()}%{/if}
</span>

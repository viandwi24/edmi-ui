<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		numeric = false,
		trend,
		...restProps
	}: WithElementRef<HTMLTdAttributes> & {
		/** ✦ Right-aligned, mono, tabular numbers (DESIGN §4 rule 10). */
		numeric?: boolean;
		/** ✦ Colours a numeric value: up = brand text, down = destructive text. */
		trend?: "up" | "down";
	} = $props();
</script>

<td
	bind:this={ref}
	data-slot="table-cell"
	data-numeric={numeric ? "" : undefined}
	data-trend={trend}
	class={cn(
		"p-3 align-middle whitespace-nowrap data-[numeric]:text-right data-[numeric]:font-mono data-[numeric]:tabular-nums data-[trend=down]:text-destructive-text data-[trend=up]:text-brand-text [&:has([role=checkbox])]:pr-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>

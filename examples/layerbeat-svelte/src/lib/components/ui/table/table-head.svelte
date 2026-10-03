<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLThAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		numeric = false,
		...restProps
	}: WithElementRef<HTMLThAttributes> & {
		/** ✦ Right-aligned, mono, tabular numbers (DESIGN §4 rule 10). */
		numeric?: boolean;
	} = $props();
</script>

<th
	bind:this={ref}
	data-slot="table-head"
	data-numeric={numeric ? "" : undefined}
	class={cn(
		"px-3 py-2.5 text-left align-middle text-[12.5px] font-medium whitespace-nowrap text-muted-foreground data-[numeric]:text-right [&:has([role=checkbox])]:pr-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// Bits UI does not filter, so render this when your filtered list is empty:
	// {#if filtered.length === 0}<ComboboxEmpty>No results.</ComboboxEmpty>{/if}
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="combobox-empty"
	class={cn(
		"flex w-full justify-center py-2 text-center text-[13.5px] text-muted-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

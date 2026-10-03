<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// Bind `ref` and pass it to `<ComboboxContent customAnchor={chipsRef}>` so the list anchors to the chips.
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="combobox-chips"
	class={cn(
		"flex min-h-9 flex-wrap items-center gap-1 rounded-md border border-input bg-card bg-clip-padding px-3 py-1 text-sm shadow-sunk focus-within:border-ring focus-within:shadow-ring has-aria-invalid:border-destructive has-aria-invalid:shadow-ring-error has-data-[slot=combobox-chip]:px-1.5",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();
</script>

<tr bind:this={ref} data-slot="table-row" class={cn("border-b border-border transition-colors hover:bg-[color-mix(in_srgb,var(--muted)_50%,var(--card))] has-aria-expanded:bg-[color-mix(in_srgb,var(--muted)_50%,var(--card))] data-[state=selected]:bg-[color-mix(in_srgb,var(--brand)_7%,var(--card))]", className)} {...restProps}>
	{@render children?.()}
</tr>

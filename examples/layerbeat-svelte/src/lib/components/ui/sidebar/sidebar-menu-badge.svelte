<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="sidebar-menu-badge"
	data-sidebar="menu-badge"
	class={cn(
		"pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--brand)_30%,var(--popover))] bg-brand-soft px-1.5 font-mono text-[11px] font-medium text-brand-text tabular-nums select-none group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

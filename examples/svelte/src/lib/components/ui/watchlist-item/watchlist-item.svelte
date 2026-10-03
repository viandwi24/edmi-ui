<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		symbol,
		price,
		change,
		color = "var(--chart-1)",
		letter,
		active,
		raised = false,
		...restProps
	}: WithElementRef<Omit<HTMLAnchorAttributes, "children">, HTMLAnchorElement> & {
		symbol: string;
		price: string;
		/** Signed percentage, e.g. `+2.38%`. */
		change: string;
		/** Tile background: any CSS color, default `var(--chart-1)`. */
		color?: string;
		letter?: string;
		active?: boolean;
		/** ✦ the active row gets a one-step lip. */
		raised?: boolean;
	} = $props();

	const down = $derived(/^[-−–]/.test(change.trim()));
</script>

<!-- Compact sidebar row: colored letter tile, symbol, mono price and change. -->
<a
	bind:this={ref}
	data-slot="watchlist-item"
	data-active={active ? "" : undefined}
	class={cn(
		"flex h-10 items-center gap-2.5 rounded-lg px-2.5 text-[13.5px] text-sidebar-foreground outline-none hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-ring",
		"data-[active]:bg-sidebar-accent data-[active]:font-medium data-[active]:shadow-[inset_0_0_0_1px_var(--sidebar-border)]",
		raised &&
			"border border-transparent data-[active]:border-sidebar-border data-[active]:border-b-lip data-[active]:shadow-btn-outline",
		className
	)}
	{...restProps}
>
	<span
		class="inline-flex size-[26px] items-center justify-center rounded-[7px] text-xs font-semibold text-primary-foreground"
		style:background={color}>{letter ?? symbol.charAt(0)}</span
	>
	<span class="min-w-0 flex-1 truncate">{symbol}</span>
	<span class="font-mono text-[11.5px] text-muted-foreground">{price}</span>
	<span class={cn("font-mono text-[11.5px]", down ? "text-destructive-text" : "text-brand-text")}>{change}</span>
</a>

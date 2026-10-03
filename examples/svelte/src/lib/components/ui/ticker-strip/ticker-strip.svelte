<script lang="ts" module>
	export type TickerItem = {
		symbol: string;
		price: string;
		/** Signed percentage string, e.g. `+0.42%` or `−0.31%`. Sign sets the color. */
		change: string;
		/** Avatar image; falls back to the symbol's first letter. */
		image?: string;
		href?: string;
	};
</script>

<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "#lib/components/ui/avatar/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import { cn } from "#lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		items,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "children" | "size"> & { items: TickerItem[] } = $props();

	const isDown = (s: string) => /^[-−–]/.test(s.trim());
	const cell = "block min-w-[150px] flex-1 px-[18px] py-3.5 not-first:border-l not-first:border-border";
</script>

{#snippet content(item: TickerItem)}
	<div class="flex items-center gap-2">
		<Avatar class="size-[22px]">
			{#if item.image}<AvatarImage src={item.image} alt="" />{/if}
			<AvatarFallback class="text-[9px]">{item.symbol.charAt(0)}</AvatarFallback>
		</Avatar>
		<span class="font-mono text-xs text-muted-foreground">{item.symbol}</span>
	</div>
	<div class="mt-2.5 font-mono text-[17px]">{item.price}</div>
	<div class={cn("mt-1 font-mono text-xs", isDown(item.change) ? "text-destructive-text" : "text-success-text")}>
		{item.change}
	</div>
{/snippet}

<!-- Horizontal row of price cells (avatar + symbol, mono price, up/down change). -->
<Card bind:ref data-slot="ticker-strip" class={cn("flex-row gap-0 overflow-x-auto p-0", className)} {...restProps}>
	{#each items as item (item.symbol)}
		{#if item.href}
			<a href={item.href} class={cn(cell, "hover:bg-accent/50")}>{@render content(item)}</a>
		{:else}
			<div class={cell}>{@render content(item)}</div>
		{/if}
	{/each}
</Card>

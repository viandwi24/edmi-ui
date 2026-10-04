<script lang="ts" module>
	export type IndexRowData = {
		name: string;
		symbol: string;
		/** One avatar per constituent token: image URL or a short label. */
		tokens: { label: string; image?: string }[];
		tags?: string[];
		creator: string;
		price: string;
		/** Signed percentage, e.g. `+1.12%`. */
		change: string;
		aum: string;
		holders: string | number;
		/** Series for the 30d sparkline. */
		spark?: number[];
		href?: string;
	};
</script>

<script lang="ts">
	import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "#lib/components/ui/avatar/index.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { TableCell, TableRow } from "#lib/components/ui/table/index.js";
	import { cn } from "#lib/utils.js";
	import type { ComponentProps } from "svelte";
	import Sparkline from "./sparkline.svelte";

	let {
		ref = $bindable(null),
		class: className,
		index,
		rank,
		delta = "text",
		...restProps
	}: Omit<ComponentProps<typeof TableRow>, "children"> & {
		index: IndexRowData;
		/** ✦ Leading mono rank column (pair with `<IndexRowHeader rank />`). */
		rank?: number | string;
		/** ✦ `text` (default) or `pill`: soft tinted pill for the 7d delta. */
		delta?: "text" | "pill";
	} = $props();

	const down = $derived(/^[-−–]/.test(index.change.trim()));
</script>

<!-- One market row: avatar stack, name + ticker + tags, mono numbers, delta, sparkline. Use inside `<TableBody>`. -->
<TableRow bind:ref data-slot="index-row" class={className} {...restProps}>
	{#if rank !== undefined}
		<TableCell class="w-10 pr-0 font-mono text-[13px] text-muted-foreground">{rank}</TableCell>
	{/if}
	<TableCell>
		<div class="flex items-center gap-3">
			<AvatarGroup>
				{#each index.tokens as t (t.label)}
					<Avatar class="size-7">
						{#if t.image}<AvatarImage src={t.image} alt="" />{/if}
						<AvatarFallback class="text-[10px]">{t.label}</AvatarFallback>
					</Avatar>
				{/each}
			</AvatarGroup>
			<div>
				<div class="flex items-center gap-2">
					{#if index.href}
						<a href={index.href} class="font-semibold hover:underline">{index.name}</a>
					{:else}
						<span class="font-semibold">{index.name}</span>
					{/if}
					<span class="font-mono text-[11.5px] text-muted-foreground">{index.symbol}</span>
				</div>
				{#if index.tags?.length}
					<div class="mt-1 flex items-center gap-1">
						{#each index.tags as tag (tag)}
							<Badge variant="secondary" class="h-5 text-[11px]">{tag}</Badge>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</TableCell>
	<TableCell class="font-mono text-xs text-muted-foreground">{index.creator}</TableCell>
	<TableCell class="text-right font-mono text-[12.5px] font-semibold">{index.price}</TableCell>
	<TableCell
		class={cn("text-right font-mono text-[12.5px]", delta === "text" && (down ? "text-destructive-text" : "text-success-text"))}
	>
		{#if delta === "pill"}
			<span
				class={cn(
					"inline-block rounded-md px-2 py-[3px] text-xs",
					down ? "bg-destructive-soft text-destructive-text" : "bg-brand-soft text-brand-text"
				)}>{index.change}</span
			>
		{:else}
			{index.change}
		{/if}
	</TableCell>
	<TableCell class="text-right font-mono text-[12.5px]">{index.aum}</TableCell>
	<TableCell class="text-right font-mono text-[12.5px]">{index.holders}</TableCell>
	<TableCell class="text-right">
		{#if index.spark}<Sparkline data={index.spark} tone={down ? "down" : "up"} />{/if}
	</TableCell>
</TableRow>

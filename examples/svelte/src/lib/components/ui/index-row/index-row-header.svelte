<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type IndexRowHeaderLabels = {
		name?: string | Snippet;
		owner?: string | Snippet;
		price?: string | Snippet;
		change?: string | Snippet;
		value?: string | Snippet;
		count?: string | Snippet;
		trend?: string | Snippet;
	};
</script>

<script lang="ts">
	import { TableHead, TableRow } from "#lib/components/ui/table/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		rank = false,
		labels,
		...restProps
	}: Omit<ComponentProps<typeof TableRow>, "children"> & {
		/** ✦ Leading empty cell for the `rank` column of IndexRow. */
		rank?: boolean;
		/** Column labels (each defaults to a neutral English word). */
		labels?: IndexRowHeaderLabels;
	} = $props();

	const l = $derived({
		name: "Name",
		owner: "Owner",
		price: "Price",
		change: "Change",
		value: "Value",
		count: "Count",
		trend: "Trend",
		...labels,
	});
</script>

{#snippet text(v: string | Snippet)}
	{#if typeof v === "function"}{@render v()}{:else}{v}{/if}
{/snippet}

<!-- Header row matching the IndexRow columns. Place it in `<TableHeader>`. -->
<TableRow bind:ref {...restProps}>
	{#if rank}<TableHead class="w-10" />{/if}
	<TableHead>{@render text(l.name)}</TableHead>
	<TableHead>{@render text(l.owner)}</TableHead>
	<TableHead class="text-right">{@render text(l.price)}</TableHead>
	<TableHead class="text-right">{@render text(l.change)}</TableHead>
	<TableHead class="text-right">{@render text(l.value)}</TableHead>
	<TableHead class="text-right">{@render text(l.count)}</TableHead>
	<TableHead class="text-right">{@render text(l.trend)}</TableHead>
</TableRow>

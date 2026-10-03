<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		class: className,
		name,
		tagline,
		price,
		priceNote,
		action,
		features,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		name: string;
		tagline?: string;
		/** Headline price, e.g. "1% fee to you". */
		price?: string;
		/** Small note under the price. */
		priceNote?: string;
		/** Call to action, usually a full-width `Button`. */
		action?: Snippet;
		features?: string[];
	} = $props();
</script>

<Card data-slot="pricing-plan" class={cn("gap-0 p-6", className)} {...restProps}>
	<div class="text-[22px] font-semibold">{name}</div>
	{#if tagline}<div class="mt-1 text-[13.5px] text-muted-foreground">{tagline}</div>{/if}
	{#if price}<div class="mt-[22px] text-[22px] font-semibold">{price}</div>{/if}
	{#if priceNote}<div class="mt-1 text-[12.5px] text-muted-foreground">{priceNote}</div>{/if}
	{#if action}
		<div class="mt-[18px] [&>[data-slot=button]]:w-full">{@render action()}</div>
	{/if}
	{#if features?.length}
		<Separator class="my-[18px]" />
		<ul class="flex flex-col gap-2.5 text-[13.5px]">
			{#each features as f, i (i)}
				<li class="flex items-center gap-2.5">
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						class="size-3.5 text-muted-foreground"
					/>
					{f}
				</li>
			{/each}
		</ul>
	{/if}
</Card>

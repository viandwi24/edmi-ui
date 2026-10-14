<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		name,
		tagline,
		price,
		priceNote,
		action,
		features,
		featuresLead,
		feature,
		elevation = "auto",
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		name: string | Snippet;
		tagline?: string | Snippet;
		/** Headline price, e.g. "1% fee to you". */
		price?: string | Snippet;
		/** Small note under the price. */
		priceNote?: string | Snippet;
		/** Call to action, usually a full-width `Button`. */
		action?: Snippet;
		features?: (string | Snippet)[];
		/** ✦ Lead row above the features, e.g. "Included:" or "Everything in Holder, plus:". */
		featuresLead?: string | Snippet;
		/** ✦ Rich content for a feature row (default: the text). */
		feature?: Snippet<[string | Snippet, number]>;
		/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();
</script>

<Card bind:ref {elevation} data-slot="pricing-plan" class={cn("gap-0 p-6", className)} {...restProps}>
	<div class="text-[22px] font-semibold">{#if typeof name === "function"}{@render name()}{:else}{name}{/if}</div>
	{#if tagline}<div class="mt-1 text-[13.5px] text-muted-foreground">{#if typeof tagline === "function"}{@render tagline()}{:else}{tagline}{/if}</div>{/if}
	{#if price}<div class="mt-[22px] text-[22px] font-semibold">{#if typeof price === "function"}{@render price()}{:else}{price}{/if}</div>{/if}
	{#if priceNote}<div class="mt-1 text-[12.5px] text-muted-foreground">{#if typeof priceNote === "function"}{@render priceNote()}{:else}{priceNote}{/if}</div>{/if}
	{#if action}
		<div class="mt-[18px] [&>[data-slot=button]]:w-full">{@render action()}</div>
	{/if}
	{#if features?.length}
		<Separator class="my-[18px]" />
		{#if featuresLead}
			<div data-slot="pricing-plan-lead" class="mb-3.5 text-[15px] font-semibold">
				{#if typeof featuresLead === "function"}{@render featuresLead()}{:else}{featuresLead}{/if}
			</div>
		{/if}
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
					{#if feature}{@render feature(f, i)}{:else if typeof f === "function"}{@render f()}{:else}{f}{/if}
				</li>
			{/each}
		</ul>
	{/if}
</Card>

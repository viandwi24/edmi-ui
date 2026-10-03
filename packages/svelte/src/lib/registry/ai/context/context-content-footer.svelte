<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getUsage } from "tokenlens";
	import { formatUsd, useContextValue } from "./use-context.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();

	const context = useContextValue();
	const totalCost = $derived.by(() => {
		const costUSD = context.modelId
			? getUsage({
					modelId: context.modelId,
					usage: {
						input: context.usage?.inputTokens ?? 0,
						output: context.usage?.outputTokens ?? 0,
					},
				}).costUSD?.totalUSD
			: undefined;
		return formatUsd(costUSD ?? 0);
	});
</script>

<div
	class={cn("flex w-full items-center justify-between gap-3 bg-muted p-3 text-xs", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<span class="text-muted-foreground">Total cost</span>
		<span class="font-mono font-semibold">{totalCost}</span>
	{/if}
</div>

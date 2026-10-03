<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getUsage } from "tokenlens";
	import TokensWithCost from "./tokens-with-cost.svelte";
	import { formatUsd, useContextValue } from "./use-context.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();

	const context = useContextValue();
	const tokens = $derived(context.usage?.outputTokens ?? 0);
	const costText = $derived.by(() => {
		if (!tokens) return undefined;
		const cost = context.modelId
			? getUsage({
					modelId: context.modelId,
					usage: { input: 0, output: tokens },
				}).costUSD?.totalUSD
			: undefined;
		return formatUsd(cost ?? 0);
	});
</script>

{#if children}
	{@render children()}
{:else if tokens > 0}
	<div class={cn("flex items-center justify-between text-xs", className)} {...restProps}>
		<span class="text-muted-foreground">Output</span>
		<TokensWithCost {costText} {tokens} />
	</div>
{/if}

<script lang="ts">
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { formatCompact, formatPercent, useContextValue } from "./use-context.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();

	const PERCENT_MAX = 100;
	const context = useContextValue();
	const usedPercent = $derived(
		context.maxTokens === 0 ? 0 : context.usedTokens / context.maxTokens
	);
</script>

<div class={cn("w-full space-y-2 p-3", className)} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<div class="flex items-center justify-between gap-3 text-xs">
			<p class="font-semibold">{formatPercent(usedPercent)}</p>
			<p class="font-mono text-muted-foreground">
				{formatCompact(context.usedTokens)} / {formatCompact(context.maxTokens)}
			</p>
		</div>
		<div class="space-y-2">
			<Progress variant="brand" value={usedPercent * PERCENT_MAX} />
		</div>
	{/if}
</div>

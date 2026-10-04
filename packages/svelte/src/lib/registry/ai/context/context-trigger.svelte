<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { HoverCardTrigger } from "$lib/registry/ui/hover-card/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import ContextIcon from "./context-icon.svelte";
	import { formatPercent, useContextValue } from "./use-context.svelte.js";

	let {
		class: className,
		child: customChild,
		children,
		...restProps
	}: Omit<ButtonProps, "href" | "child"> & {
		/** Bring your own trigger element (bits-ui `child` snippet). */
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();

	const context = useContextValue();
	const usedPercent = $derived(
		context.maxTokens === 0 ? 0 : context.usedTokens / context.maxTokens
	);
</script>

<HoverCardTrigger>
	{#snippet child({ props })}
		{#if customChild}
			{@render customChild({ props })}
		{:else}
			<Button type="button" variant="ghost" class={className} {...props} {...restProps}>
				{#if children}
					{@render children()}
				{:else}
					<ContextIcon />
					<span
						class={cn(
							"font-mono text-xs font-medium",
							usedPercent >= 0.9 ? "text-warning-text" : "text-foreground"
						)}
					>
						{formatPercent(usedPercent)}
					</span>
				{/if}
			</Button>
		{/if}
	{/snippet}
</HoverCardTrigger>

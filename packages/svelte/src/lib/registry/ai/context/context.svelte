<script lang="ts">
	import { HoverCard } from "$lib/registry/ui/hover-card/index.js";
	import type { LanguageModelUsage } from "ai";
	import type { ComponentProps } from "svelte";
	import { type ModelId, setContextValue } from "./use-context.svelte.js";

	let {
		usedTokens,
		maxTokens,
		usage,
		modelId,
		open = $bindable(false),
		openDelay = 0,
		closeDelay = 0,
		children,
		...restProps
	}: ComponentProps<typeof HoverCard> & {
		usedTokens: number;
		maxTokens: number;
		usage?: LanguageModelUsage;
		modelId?: ModelId;
	} = $props();

	setContextValue({
		get usedTokens() {
			return usedTokens;
		},
		get maxTokens() {
			return maxTokens;
		},
		get usage() {
			return usage;
		},
		get modelId() {
			return modelId;
		},
	});
</script>

<HoverCard bind:open {openDelay} {closeDelay} {...restProps}>
	{@render children?.()}
</HoverCard>

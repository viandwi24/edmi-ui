<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { CollapsibleTrigger } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { Shimmer } from "../shimmer/index.js";
	import { useReasoning } from "./use-reasoning.svelte.js";

	let {
		class: className,
		children,
		getThinkingMessage,
		...restProps
	}: ComponentProps<typeof CollapsibleTrigger> & {
		/** Custom label; return a string. The shimmer is used while streaming either way. */
		getThinkingMessage?: (isStreaming: boolean, duration?: number) => string;
	} = $props();

	const reasoning = useReasoning();

	const label = $derived.by(() => {
		if (getThinkingMessage) return getThinkingMessage(reasoning.isStreaming, reasoning.duration);
		if (reasoning.isStreaming || reasoning.duration === 0) return "Thinking…";
		if (reasoning.duration === undefined) return "Thought for a few seconds";
		return `Thought for ${reasoning.duration} seconds`;
	});
	const shimmering = $derived(reasoning.isStreaming || reasoning.duration === 0);
</script>

<CollapsibleTrigger
	data-slot="ai-reasoning-trigger"
	class={cn(
		"flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="BrainIcon"
			tabler="IconBrain"
			hugeicons="AiBrainIcon"
			phosphor="BrainIcon"
			remixicon="RiBrainLine"
			class="size-4"
		/>
		{#if shimmering}
			<Shimmer as="span" duration={1}>{label}</Shimmer>
		{:else}
			<span>{label}</span>
		{/if}
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			class={cn("ml-auto size-4 transition-transform", reasoning.isOpen ? "rotate-180" : "rotate-0")}
		/>
	{/if}
</CollapsibleTrigger>

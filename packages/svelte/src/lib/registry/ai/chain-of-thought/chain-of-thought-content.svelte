<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible, CollapsibleContent } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { useChainOfThought } from "./use-chain-of-thought.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CollapsibleContent> = $props();

	const cot = useChainOfThought();
</script>

<Collapsible open={cot.isOpen}>
	<CollapsibleContent
		data-slot="ai-chain-of-thought-content"
		class={cn(
			"overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
			className
		)}
		{...restProps}
	>
		<div class="pl-0.5">
			{@render children?.()}
		</div>
	</CollapsibleContent>
</Collapsible>

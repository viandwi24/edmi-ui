<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { setChainOfThoughtContext } from "./use-chain-of-thought.svelte.js";

	let {
		class: className,
		open = $bindable(),
		defaultOpen = false,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { open?: boolean; defaultOpen?: boolean } = $props();

	// svelte-ignore state_referenced_locally
	if (open === undefined) open = defaultOpen;

	setChainOfThoughtContext({
		get isOpen() {
			return !!open;
		},
		setIsOpen: (value: boolean) => {
			open = value;
		},
	});
</script>

<div data-slot="ai-chain-of-thought" class={cn("not-prose w-full space-y-3", className)} {...restProps}>
	{@render children?.()}
</div>

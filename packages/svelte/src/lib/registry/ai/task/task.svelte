<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		open = $bindable(true),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> = $props();
</script>

<Collapsible bind:open data-slot="ai-task" class={cn("not-prose", className)} {...restProps}>
	{@render children?.()}
</Collapsible>

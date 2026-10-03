<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		open = $bindable(false),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> = $props();
</script>

<Collapsible bind:open data-slot="ai-sources" class={cn("not-prose text-[13.5px]", className)} {...restProps}>
	{@render children?.()}
</Collapsible>

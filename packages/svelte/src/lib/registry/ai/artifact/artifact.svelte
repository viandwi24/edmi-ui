<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// Container for generated output. Built on the ui card; `elevation` ✦ is forwarded to the card (Card props).
	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Card> = $props();
</script>

<Card data-slot="ai-artifact" class={cn("w-full gap-0 py-0", className)} {...restProps}>
	{@render children?.()}
</Card>

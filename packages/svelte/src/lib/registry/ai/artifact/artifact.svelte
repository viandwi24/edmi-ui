<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// Container for generated output. Built on the ui card; `raised` is forwarded to the card as `elevation`.
	let {
		class: className,
		raised = false,
		children,
		...restProps
	}: ComponentProps<typeof Card> & {
		/** legacy prop, forwarded as `elevation="raised"` (the AI pack migration renames it) */
		raised?: boolean;
	} = $props();
</script>

<Card data-slot="ai-artifact" elevation={raised ? "raised" : undefined} class={cn("w-full gap-0 py-0", className)} {...restProps}>
	{@render children?.()}
</Card>

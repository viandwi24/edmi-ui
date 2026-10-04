<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// An agent's configuration at a glance. Built on the ui card; `raised` ✦ gives the one-step 3D look.
	let { class: className, raised = false, children, ...restProps }: ComponentProps<typeof Card> =
		$props();
</script>

<Card data-slot="ai-agent" {raised} class={cn("not-prose w-full gap-0 py-0", className)} {...restProps}>
	{@render children?.()}
</Card>

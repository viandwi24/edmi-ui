<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// Container for generated output. Built on the ui card; `raised` ✦ gives the one-step 3D look.
	let { class: className, raised = false, children, ...restProps }: ComponentProps<typeof Card> =
		$props();
</script>

<Card data-slot="ai-artifact" {raised} class={cn("w-full gap-0 py-0", className)} {...restProps}>
	{@render children?.()}
</Card>

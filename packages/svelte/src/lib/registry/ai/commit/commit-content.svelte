<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { CollapsibleContent } from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof CollapsibleContent> =
		$props();
</script>

<CollapsibleContent class={cn("px-4 pb-3", className)} {...restProps}>
	{@render children?.()}
</CollapsibleContent>

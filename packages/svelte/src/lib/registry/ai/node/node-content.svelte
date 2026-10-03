<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { CardContent } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardContent> = $props();
</script>

<CardContent {...restProps} data-slot="ai-node-content" class={cn("px-3 py-2.5 text-[12.5px]", className)}>
	{@render children?.()}
</CardContent>

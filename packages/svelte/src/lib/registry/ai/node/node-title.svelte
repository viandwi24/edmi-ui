<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { CardTitle } from "$lib/registry/ui/card/index.js";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardTitle> = $props();
</script>

<CardTitle {...restProps} data-slot="ai-node-title" class={cn("text-[13.5px] font-semibold", className)}>
	{@render children?.()}
</CardTitle>

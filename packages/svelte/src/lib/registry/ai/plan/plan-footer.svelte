<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CardFooter } from "$lib/registry/ui/card/index.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof CardFooter> = $props();
</script>

<CardFooter data-slot="ai-plan-footer" class={cn("px-4 py-2.5", className)} {...restProps}>
	{@render children?.()}
</CardFooter>

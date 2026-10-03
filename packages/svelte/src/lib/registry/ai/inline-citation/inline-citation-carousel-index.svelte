<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { getEmblaContext } from "$lib/registry/ui/carousel/context.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const embla = getEmblaContext("<InlineCitationCarouselIndex/>");
</script>

<div
	class={cn("ml-auto font-mono text-xs text-muted-foreground tabular-nums", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{embla.selectedIndex + 1}/{embla.scrollSnaps.length}
	{/if}
</div>

<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { CarouselItem } from "$lib/registry/ui/carousel/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof CarouselItem> = $props();
</script>

<!-- CarouselContent has a -ms-4 gutter, so the left padding is gutter (16) + content inset (14). -->
<CarouselItem class={cn("w-full space-y-1 py-3 pr-3.5 ps-[30px]", className)} {...restProps}>
	{@render children?.()}
</CarouselItem>

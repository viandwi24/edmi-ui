<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Carousel } from "$lib/registry/ui/carousel/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Carousel> = $props();
</script>

<Carousel class={cn("w-full", className)} {...restProps}>
	{@render children?.()}
</Carousel>

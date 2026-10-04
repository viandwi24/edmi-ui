<script lang="ts">
	import { CarouselContent } from "$lib/registry/ui/carousel/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof CarouselContent> = $props();
</script>

<CarouselContent {...restProps}>
	{@render children?.()}
</CarouselContent>

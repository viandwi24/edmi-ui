<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { getEmblaContext } from "./context.js";
	import type { HTMLAttributes } from "svelte/elements";

	// ✦ Position dots: the active slide is a wider --foreground pill.
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "children">> = $props();

	const emblaCtx = getEmblaContext("<Carousel.Dots/>");
</script>

<div
	bind:this={ref}
	data-slot="carousel-dots"
	class={cn("mt-3 flex items-center justify-center gap-1.5", className)}
	{...restProps}
>
	{#each emblaCtx.scrollSnaps as _, i (i)}
		<button
			type="button"
			aria-label={`Go to slide ${i + 1}`}
			aria-current={i === emblaCtx.selectedIndex}
			onclick={() => emblaCtx.scrollTo(i)}
			class={cn(
				"h-1.5 rounded-full outline-none transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				i === emblaCtx.selectedIndex ? "w-6 bg-foreground" : "w-1.5 bg-input"
			)}
		></button>
	{/each}
</div>

<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		children,
		as = "p",
		class: className,
		duration = 2,
		spread = 2,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		children: Snippet;
		as?: keyof HTMLElementTagNameMap;
		/** Seconds per sweep. */
		duration?: number;
		/** Highlight width per character, in px. */
		spread?: number;
	} = $props();

	// A snippet cannot be measured, so the highlight width follows the rendered text length.
	let el = $state<HTMLElement | null>(null);
	let length = $state(0);
	$effect(() => {
		if (!el) return;
		const sync = () => (length = el?.textContent?.length ?? 0);
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(el, { characterData: true, childList: true, subtree: true });
		return () => observer.disconnect();
	});
</script>

<!-- The sweep is a --foreground highlight over --muted-foreground text; the 0-alpha stops only shape the
	gradient inside the text clip (no surface is transparent, DESIGN §4.16). -->
<svelte:element
	this={as}
	bind:this={el}
	data-slot="ai-shimmer"
	class={cn(
		"ai-shimmer relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
		"[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--foreground),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
		className
	)}
	style="--spread: {length * spread}px; --shimmer-duration: {duration}s; background-image: var(--bg), linear-gradient(var(--muted-foreground), var(--muted-foreground)); background-position: 100% center;"
	{...restProps}
>
	{@render children()}
</svelte:element>

<style>
	@keyframes ai-shimmer-sweep {
		from {
			background-position: 100% center;
		}
		to {
			background-position: 0% center;
		}
	}

	.ai-shimmer {
		animation: ai-shimmer-sweep var(--shimmer-duration, 2s) linear infinite;
	}
</style>

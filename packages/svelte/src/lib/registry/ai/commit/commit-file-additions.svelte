<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	// `+12`; always rendered (`+0` stays visible, board AI 05).
	let {
		count,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { count: number; children?: Snippet } = $props();
</script>

<span class={cn("text-success-text", className)} {...restProps}>
	{#if children}{@render children()}{:else}+{count}{/if}
</span>

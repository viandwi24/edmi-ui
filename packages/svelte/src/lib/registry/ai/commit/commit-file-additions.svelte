<script lang="ts">
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

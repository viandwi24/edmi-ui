<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		count,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { count: number; children?: Snippet } = $props();
</script>

<span class={cn("text-destructive-text", className)} {...restProps}>
	{#if children}{@render children()}{:else}−{count}{/if}
</span>

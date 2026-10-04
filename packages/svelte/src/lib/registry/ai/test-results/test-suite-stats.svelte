<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		passed = 0,
		failed = 0,
		skipped = 0,
		class: className,
		children,
	}: {
		passed?: number;
		failed?: number;
		skipped?: number;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={cn("ml-auto flex items-center gap-2 text-xs", className)}>
	{#if children}
		{@render children()}
	{:else}
		{#if passed > 0}<span class="text-success-text">{passed} passed</span>{/if}
		{#if failed > 0}<span class="text-destructive-text">{failed} failed</span>{/if}
		{#if skipped > 0}<span class="text-warning-text">{skipped} skipped</span>{/if}
	{/if}
</div>

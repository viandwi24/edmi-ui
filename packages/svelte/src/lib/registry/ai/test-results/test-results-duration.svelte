<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { formatDuration, useTestResultsContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const results = useTestResultsContext();
</script>

{#if results.summary?.duration}
	<span class={cn("font-mono text-xs text-muted-foreground", className)}>
		{#if children}{@render children()}{:else}{formatDuration(results.summary.duration)}{/if}
	</span>
{/if}

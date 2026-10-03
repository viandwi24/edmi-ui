<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useTestResultsContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const results = useTestResultsContext();

	const running = $derived.by(() => {
		const s = results.summary;
		return s ? Math.max(s.total - s.passed - s.failed - s.skipped, 0) : 0;
	});
</script>

{#if results.summary}
	<div data-slot="ai-test-results-progress" class={cn("-mt-0.5 px-4 pb-3.5", className)}>
		{#if children}
			{@render children()}
		{:else}
			<div
				class="flex h-1.5 gap-0.5"
				role="img"
				aria-label={`${results.summary.passed} of ${results.summary.total} tests passed`}
			>
				{#if results.summary.passed > 0}
					<span class="rounded-[3px] bg-success" style={`flex: ${results.summary.passed}`}></span>
				{/if}
				{#if results.summary.failed > 0}
					<span class="rounded-[3px] bg-destructive" style={`flex: ${results.summary.failed}`}></span>
				{/if}
				{#if results.summary.skipped > 0}
					<span class="rounded-[3px] bg-warning" style={`flex: ${results.summary.skipped}`}></span>
				{/if}
				{#if running > 0}
					<span class="rounded-[3px] bg-muted" style={`flex: ${running}`}></span>
				{/if}
			</div>
		{/if}
	</div>
{/if}

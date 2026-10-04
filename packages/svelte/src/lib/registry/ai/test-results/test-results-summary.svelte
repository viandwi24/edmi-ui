<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useTestResultsContext } from "./use-test-results.svelte.js";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const results = useTestResultsContext();
</script>

{#if results.summary}
	<div class={cn("flex items-center gap-2.5", className)}>
		{#if children}
			{@render children()}
		{:else}
			<span class="font-semibold">Tests</span>
			<Badge class="h-5" variant="success">{results.summary.passed} passed</Badge>
			{#if results.summary.failed > 0}
				<Badge class="h-5" variant="destructive">{results.summary.failed} failed</Badge>
			{/if}
			{#if results.summary.skipped > 0}
				<Badge class="h-5" variant="warning">{results.summary.skipped} skipped</Badge>
			{/if}
		{/if}
	</div>
{/if}

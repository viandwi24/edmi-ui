<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import TestResultsDuration from "./test-results-duration.svelte";
	import TestResultsHeader from "./test-results-header.svelte";
	import TestResultsProgress from "./test-results-progress.svelte";
	import TestResultsSummary from "./test-results-summary.svelte";
	import { setTestResultsContext, type TestResultsSummaryData } from "./use-test-results.svelte.js";

	let {
		ref = $bindable(null),
		summary,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		summary?: TestResultsSummaryData;
	} = $props();

	setTestResultsContext({
		get summary() {
			return summary;
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="ai-test-results"
	class={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if summary}
		<TestResultsHeader>
			<TestResultsSummary />
			<TestResultsDuration />
		</TestResultsHeader>
		<TestResultsProgress />
	{/if}
</div>

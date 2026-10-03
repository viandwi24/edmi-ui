<script lang="ts">
	import { Suggestion, Suggestions } from "@edmi-svelte/ai/suggestion";

	const prompts = [
		"What moved NVDAx today?",
		"Compare MAG4 vs SPYx",
		"Explain the keeper",
		"Show my fees",
	];
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
	<Suggestions>
		{#each prompts as p (p)}
			<Suggestion suggestion={p} />
		{/each}
	</Suggestions>
	<div class="flex flex-wrap gap-2">
		<Suggestion suggestion="Rebalance now" variant="card">Check drift and propose trades</Suggestion>
		<Suggestion suggestion="Draft a post" variant="card">Write an update for the feed</Suggestion>
	</div>
</div>

<script lang="ts">
	import { Suggestion } from "@edmi-svelte/ai/suggestion";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap gap-2">
				<Suggestion suggestion="Rebalance now" elevation={level.value} />
				<Suggestion suggestion="Draft a post" elevation={level.value} />
				<Suggestion suggestion="Explain the keeper" variant="card" elevation={level.value}>How rebalancing works</Suggestion>
			</div>
		</div>
	{/each}
</div>

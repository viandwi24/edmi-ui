<script lang="ts">
	import * as Bubble from "@edmi-svelte/ui/bubble";

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<div class="flex w-full max-w-md flex-col gap-4">
		<Bubble.Root variant="secondary" class="mb-3">
			<Bubble.Content>The keeper just rebalanced MAG4.</Bubble.Content>
			<Bubble.Reactions elevation={l.value}>
				<Bubble.Reaction active>👍 4</Bubble.Reaction>
				<Bubble.Reaction>🚀 2</Bubble.Reaction>
				<Bubble.Reaction aria-label="Add reaction">☺</Bubble.Reaction>
			</Bubble.Reactions>
		</Bubble.Root>
</div>
		</div>
	{/each}
</div>

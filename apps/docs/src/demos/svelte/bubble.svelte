<script lang="ts">
	import * as Bubble from "@edmi-svelte/ui/bubble";

	const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const;
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<Bubble.Group>
		{#each variants as variant (variant)}
			<Bubble.Root {variant}>
				<Bubble.Content>{variant} bubble</Bubble.Content>
			</Bubble.Root>
		{/each}
	</Bubble.Group>
	<Bubble.Group>
		<Bubble.Root align="end">
			<Bubble.Content>Run it and send me the transaction.</Bubble.Content>
		</Bubble.Root>
	</Bubble.Group>
	<Bubble.Root variant="secondary" class="mb-3">
		<Bubble.Content>The keeper just rebalanced MAG4.</Bubble.Content>
		<Bubble.Reactions>
			<Bubble.Reaction active>👍 4</Bubble.Reaction>
			<Bubble.Reaction>🚀 2</Bubble.Reaction>
			<Bubble.Reaction aria-label="Add reaction">☺</Bubble.Reaction>
		</Bubble.Reactions>
	</Bubble.Root>
</div>

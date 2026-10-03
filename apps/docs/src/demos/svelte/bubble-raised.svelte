<script lang="ts">
	import * as Bubble from "@edmi-svelte/ui/bubble";
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	{#each [false, true] as raised (raised)}
		<Bubble.Root variant="secondary" class="mb-3">
			<Bubble.Content>The keeper just rebalanced MAG4.</Bubble.Content>
			<Bubble.Reactions {raised}>
				<Bubble.Reaction active>👍 4</Bubble.Reaction>
				<Bubble.Reaction>🚀 2</Bubble.Reaction>
				<Bubble.Reaction aria-label="Add reaction">☺</Bubble.Reaction>
			</Bubble.Reactions>
		</Bubble.Root>
	{/each}
</div>

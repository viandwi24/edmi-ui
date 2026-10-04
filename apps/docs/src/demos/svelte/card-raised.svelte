<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Card from "@edmi-svelte/ui/card";
</script>

<div class="flex flex-wrap items-start gap-5">
	{#each [false, true] as raised (raised)}
		<Card.Root {raised} class="w-72">
			<Card.Header>
				<Card.Title>{raised ? "Raised" : "Flat"}</Card.Title>
				<Card.Description>Magnificent Four, 4 tokens</Card.Description>
			</Card.Header>
			<Card.Content class="font-mono text-sm">Amount 1,000 USDC</Card.Content>
			<Card.Footer>
				<Button size="sm" elevation={raised ? "raised" : undefined}>Join index</Button>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

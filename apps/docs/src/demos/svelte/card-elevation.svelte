<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Card from "@edmi-svelte/ui/card";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-wrap items-start gap-5">
		{#each levels as level (level.value)}
			<div class="flex flex-col gap-2">
				<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
				<Card.Root elevation={level.value} size="sm" class="w-64">
					<Card.Header>
						<Card.Title>Join MAG4</Card.Title>
						<Card.Description>Magnificent Four, 4 tokens</Card.Description>
					</Card.Header>
					<Card.Content class="font-mono text-sm">Amount 1,000 USDC</Card.Content>
					<Card.Footer>
						<Button size="sm">Join index</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		{/each}
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-xs font-medium text-muted-foreground">Nested: a card inside a raised card resolves flat</p>
		<Card.Root elevation="raised" size="sm" class="w-80">
			<Card.Header>
				<Card.Title>Portfolio</Card.Title>
			</Card.Header>
			<Card.Content>
				<Card.Root size="sm">
					<Card.Header>
						<Card.Title>Nested card</Card.Title>
						<Card.Description>Border only, no bevel on bevel.</Card.Description>
					</Card.Header>
				</Card.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>

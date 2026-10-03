<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Card from "@edmi-svelte/ui/card";
</script>

<div class="flex flex-wrap items-start gap-5">
	<Card.Root class="w-80">
		<Card.Header>
			<Card.Title>Join MAG4</Card.Title>
			<Card.Description>Magnificent Four, 4 tokens</Card.Description>
			<Card.Action>
				<Button size="sm" variant="outline">Edit</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content class="font-mono text-sm">Amount 1,000 USDC</Card.Content>
		<Card.Footer>
			<Button size="sm" variant="outline">Cancel</Button>
			<Button size="sm">Join index</Button>
		</Card.Footer>
	</Card.Root>
	<Card.Root size="sm" class="w-64">
		<Card.Header>
			<Card.Title>Scheduled reports</Card.Title>
			<Card.Description>Weekly, Monday 09:00</Card.Description>
		</Card.Header>
	</Card.Root>
</div>

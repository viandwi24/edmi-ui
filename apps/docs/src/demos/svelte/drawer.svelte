<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Drawer from "@edmi-svelte/ui/drawer";
</script>

<Drawer.Root>
	<Drawer.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Join MAG4</Button>
		{/snippet}
	</Drawer.Trigger>
	<Drawer.Content showHandle>
		<Drawer.Header>
			<Drawer.Title>Join MAG4</Drawer.Title>
			<Drawer.Description>Amount in USDC</Drawer.Description>
		</Drawer.Header>
		<p class="text-center font-mono text-4xl">1,000</p>
		<Drawer.Footer class="flex-row">
			<Drawer.Close>
				{#snippet child({ props })}
					<Button variant="outline" class="flex-1" {...props}>Cancel</Button>
				{/snippet}
			</Drawer.Close>
			<Drawer.Close>
				{#snippet child({ props })}
					<Button class="flex-1" {...props}>Join</Button>
				{/snippet}
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>

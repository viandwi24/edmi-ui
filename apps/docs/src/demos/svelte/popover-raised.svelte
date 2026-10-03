<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Popover from "@edmi-svelte/ui/popover";
</script>

<div class="flex flex-wrap gap-3">
	{#each [false, true] as raised (raised)}
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {raised} {...props}>{raised ? "Raised popover" : "Flat popover"}</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content {raised} align="start" class="w-64">
				<Popover.Header>
					<Popover.Title>Rebalance limits</Popover.Title>
					<Popover.Description>Applied to the next keeper run.</Popover.Description>
				</Popover.Header>
			</Popover.Content>
		</Popover.Root>
	{/each}
</div>

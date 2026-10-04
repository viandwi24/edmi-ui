<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { Input } from "@edmi-svelte/ui/input";
	import * as Popover from "@edmi-svelte/ui/popover";
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Set limits</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content raised align="start" class="w-80">
		<Popover.Header>
			<Popover.Title>Rebalance limits</Popover.Title>
			<Popover.Description>Applied to the next keeper run.</Popover.Description>
		</Popover.Header>
		<div class="grid grid-cols-[1fr_120px] items-center gap-2 text-[13px]">
			<span>Drift</span>
			<Input value="5%" />
			<span>Max slippage</span>
			<Input value="1%" />
		</div>
	</Popover.Content>
</Popover.Root>

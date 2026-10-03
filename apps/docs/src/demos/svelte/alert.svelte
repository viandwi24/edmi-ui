<script lang="ts">
	import * as Alert from "@edmi-svelte/ui/alert";
	import { Button } from "@edmi-svelte/ui/button";

	const info = "M12 8h.01M11 12h1v4h1M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0";
	const check = "m8 12 3 3 5-6M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0";
	const warn =
		"M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0";
</script>

{#snippet icon(d: string)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path {d} /></svg>
{/snippet}

<div class="grid w-full max-w-xl gap-3">
	<Alert.Root>
		{@render icon(info)}
		<Alert.Title>Devnet only</Alert.Title>
		<Alert.Description>Prices come from a mock oracle. Nothing here is real money.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		{@render icon(warn)}
		<Alert.Title>Transaction failed</Alert.Title>
		<Alert.Description>Slippage was above 1%. Try a smaller order.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="success">
		{@render icon(check)}
		<Alert.Title>Index launched</Alert.Title>
		<Alert.Description>MAG4 is live and accepting joins.</Alert.Description>
		<Alert.Action>
			<Button size="xs" variant="outline">View</Button>
		</Alert.Action>
	</Alert.Root>
	<Alert.Root variant="brand">
		{@render icon(info)}
		<Alert.Title>Autopilot is on</Alert.Title>
		<Alert.Description>Rebalances run automatically with the theme accent.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="info">
		{@render icon(info)}
		<Alert.Title>Oracle updated</Alert.Title>
		<Alert.Description>Prices refresh every 15 seconds.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="warning">
		{@render icon(warn)}
		<Alert.Title>Drift is 6.2%</Alert.Title>
		<Alert.Description>Above the 5% limit. The keeper will rebalance at the next run.</Alert.Description>
	</Alert.Root>
</div>

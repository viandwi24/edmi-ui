<script lang="ts">
	import { Card } from "@edmi-svelte/ui/card";
	import * as Table from "@edmi-svelte/ui/table";

	const rows = [
		{ symbol: "NVDAx", name: "NVIDIA", price: "$188.20", weight: "32.0%", day: "+2.41%", up: true },
		{ symbol: "MSFTx", name: "Microsoft", price: "$512.10", weight: "28.0%", day: "+0.88%", up: true },
		{ symbol: "AAPLx", name: "Apple", price: "$231.45", weight: "24.0%", day: "-0.62%", up: false },
		{ symbol: "ANTHRP-pre", name: "Anthropic pre-IPO", price: "$61.30", weight: "16.0%", day: "+4.10%", up: true },
	];
</script>

<Card class="w-full max-w-xl py-0">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Token</Table.Head>
				<Table.Head numeric>Price</Table.Head>
				<Table.Head numeric>Weight</Table.Head>
				<Table.Head numeric>24h</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each rows as r (r.symbol)}
				<Table.Row>
					<Table.Cell>
						<div class="font-medium">{r.symbol}</div>
						<div class="text-[11.5px] text-muted-foreground">{r.name}</div>
					</Table.Cell>
					<Table.Cell numeric>{r.price}</Table.Cell>
					<Table.Cell numeric>{r.weight}</Table.Cell>
					<Table.Cell numeric trend={r.up ? "up" : "down"}>{r.day}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.Cell>Total · 4 tokens</Table.Cell>
				<Table.Cell numeric>NAV $0.9998</Table.Cell>
				<Table.Cell numeric>100%</Table.Cell>
				<Table.Cell numeric trend="up">+0.53%</Table.Cell>
			</Table.Row>
		</Table.Footer>
		<Table.Caption>Weights as of the last rebalance.</Table.Caption>
	</Table.Root>
</Card>

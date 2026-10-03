<script lang="ts">
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";

	let amount = $state("1,000");
	const n = $derived(Number(amount.replace(/,/g, "")) || 0);
	const rows = $derived([
		{ label: "Estimated shares", value: (n * 0.98209).toFixed(2) },
		{ label: "Fee", value: "1.00%" },
	]);
</script>

<JoinPanel
	raised
	bind:amount
	onMax={() => (amount = "2,500")}
	label="Amount"
	currency="USDC"
	{rows}
	joinLabel="Join MAG4"
/>

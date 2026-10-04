<script lang="ts">
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";

	let amount = $state("1,000");
	const n = $derived(Number(amount.replace(/,/g, "")) || 0);
	const rows = $derived([
		{ label: "Estimated shares", value: (n * 0.98209).toFixed(2) },
		{ label: "Fee", value: "1.00%" },
	]);

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<JoinPanel
	elevation={l.value}
	bind:amount
	onMax={() => (amount = "2,500")}
	label="Amount"
	currency="USDC"
	{rows}
	joinLabel="Join MAG4"
	disabled={n === 0}
/>
		</div>
	{/each}
</div>

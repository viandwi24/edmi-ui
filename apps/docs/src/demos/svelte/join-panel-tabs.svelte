<script lang="ts">
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";

	const MAX = 1240;
	let tab = $state("join");
	let amount = $state("100");
	const n = $derived(Number(amount.replace(/,/g, "")) || 0);
	const isJoin = $derived(tab === "join");
	const tabs = [
		{ value: "join", label: "Join" },
		{ value: "redeem", label: "Redeem" },
	];
	const quickAmounts = [
		{ label: "$10", value: "10" },
		{ label: "$50", value: "50" },
		{ label: "$100", value: "100" },
		{ label: "Max" },
	];
	const rows = $derived([
		{
			label: isJoin ? "Estimated shares" : "Estimated payout",
			value: (n * 0.9986).toFixed(2),
		},
		{ label: isJoin ? "Entry fee" : "Exit fee", value: "0%" },
	]);
</script>

<JoinPanel
	{tabs}
	bind:tab
	bind:amount
	onMax={() => (amount = MAX.toLocaleString("en-US"))}
	label={isJoin ? "Amount" : "Shares"}
	currency={isJoin ? "USDC" : "MAG4"}
	amountSize="lg"
	maxLabel="Max 1,240"
	{quickAmounts}
	{rows}
	joinLabel="{isJoin ? 'Join' : 'Redeem'} with {amount || 0} {isJoin ? 'USDC' : 'MAG4'}"
	disabled={n === 0}
	footnote="Self-custodied · Redeem anytime"
	class="w-[380px]"
/>

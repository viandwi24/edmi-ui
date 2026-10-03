<script lang="ts">
	import { JoinPanel } from "@edmi-svelte/ui/join-panel";

	let tab = $state("join");
	let amount = $state("100");
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
	const rows = [
		{ label: "Estimated shares", value: "99.86" },
		{ label: "Entry fee", value: "0%" },
	];
</script>

<JoinPanel
	{tabs}
	bind:tab
	bind:amount
	onMax={() => (amount = "1240")}
	amountSize="lg"
	maxLabel="Max 1,240"
	{quickAmounts}
	{rows}
	joinLabel="{tab === 'join' ? 'Join' : 'Redeem'} with {amount || 0} USDC"
	footnote="Self-custodied · Redeem anytime"
	class="w-[380px]"
/>

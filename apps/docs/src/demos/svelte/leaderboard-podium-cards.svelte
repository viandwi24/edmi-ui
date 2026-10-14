<script lang="ts">
	import { LeaderboardPodium } from "@edmi-svelte/ui/leaderboard-podium";

	const entries = [
		{
			rank: 1,
			name: "Mag Four Tilt",
			symbol: "MAGT",
			owner: "GbFK…ZUWS",
			change: "+1.12%",
			spark: [1, 1.01, 1.03, 1.02, 1.04, 1.05, 1.06],
			allocation: [
				{ label: "AAPLx", value: 30 },
				{ label: "NVDAx", value: 40 },
				{ label: "TSLAx", value: 30 },
			],
			value: "$120.1K",
			count: 2,
		},
		{
			rank: 2,
			name: "AI Frontier",
			symbol: "AIFR",
			owner: "8FcD…cL9y",
			change: "+0.84%",
			spark: [1, 1.01, 1.0, 1.02, 1.03, 1.04],
			allocation: [
				{ label: "NVDAx", value: 55 },
				{ label: "MSFTx", value: 45 },
			],
			value: "$82.4K",
			count: 2,
		},
		{
			rank: 3,
			name: "Defense & Space",
			symbol: "DFSP",
			owner: "7Ge1…kXSq",
			change: "-2.09%",
			spark: [1, 0.99, 0.98, 0.985, 0.97, 0.965],
			allocation: [
				{ label: "SPACEX-pre", value: 60 },
				{ label: "TSLAx", value: 40 },
			],
			value: "$29K",
			count: 1,
		},
	] as const;
</script>

<LeaderboardPodium
	variant="cards"
			valueLabel="AUM"
			countLabel="Holders"
	class="w-full"
	entries={entries.map((e) => ({ ...e, allocation: [...e.allocation], spark: [...e.spark] }))}
/>

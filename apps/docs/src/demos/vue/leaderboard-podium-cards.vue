<script setup lang="ts">
import { LeaderboardPodium } from "@edmi-vue/ui/leaderboard-podium";

const entries = [
	{
		rank: 1,
		name: "Mag Four Tilt",
		symbol: "MAGT",
		creator: "GbFK…ZUWS",
		change: "+1.12%",
		spark: [1, 1.01, 1.03, 1.02, 1.04, 1.05, 1.06],
		allocation: [
			{ label: "AAPLx", value: 30 },
			{ label: "NVDAx", value: 40 },
			{ label: "TSLAx", value: 30 },
		],
		aum: "$120.1K",
		holders: 2,
	},
	{
		rank: 2,
		name: "AI Frontier",
		symbol: "AIFR",
		creator: "8FcD…cL9y",
		change: "+0.84%",
		spark: [1, 1.01, 1.0, 1.02, 1.03, 1.04],
		allocation: [
			{ label: "NVDAx", value: 55 },
			{ label: "MSFTx", value: 45 },
		],
		aum: "$82.4K",
		holders: 2,
	},
	{
		rank: 3,
		name: "Defense & Space",
		symbol: "DFSP",
		creator: "7Ge1…kXSq",
		change: "-2.09%",
		spark: [1, 0.99, 0.98, 0.985, 0.97, 0.965],
		allocation: [
			{ label: "SPACEX-pre", value: 60 },
			{ label: "TSLAx", value: 40 },
		],
		aum: "$29K",
		holders: 1,
	},
] as const;
</script>

<template>
	<LeaderboardPodium
		variant="cards"
		class="w-full"
		:entries="entries.map((e) => ({ ...e, allocation: [...e.allocation], spark: [...e.spark] }))"
	/>
</template>

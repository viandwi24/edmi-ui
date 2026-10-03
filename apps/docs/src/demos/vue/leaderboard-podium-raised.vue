<script setup lang="ts">
import { LeaderboardPodium } from "@edmi-vue/ui/leaderboard-podium";

const entries = [
	{ rank: 1, name: "dewi", meta: "$49.2K AUM · 412 holders" },
	{ rank: 2, name: "noah", meta: "$31.7K AUM · 265 holders" },
	{ rank: 3, name: "sarah", meta: "$18.9K AUM · 140 holders" },
] as const;
</script>

<template>
	<LeaderboardPodium raised :entries="[...entries]" />
</template>

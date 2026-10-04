<script setup lang="ts">
import { LeaderboardPodium } from "@edmi-vue/ui/leaderboard-podium";

const entries = [
	{ rank: 1, name: "dewi", meta: "$49.2K · 412 holders" },
	{ rank: 2, name: "noah", meta: "$31.7K · 265 holders" },
	{ rank: 3, name: "sarah", meta: "$18.9K · 140 holders" },
] as const;

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
	<LeaderboardPodium :elevation="l.value" :entries="[...entries]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { WatchlistItem } from "@edmi-vue/ui/watchlist-item";

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
	<div class="flex w-60 flex-col gap-1.5">
		<WatchlistItem :elevation="l.value" href="#mag4" symbol="MAG4" price="1.0000" change="+2.38%" color="var(--chart-1)" active />
		<WatchlistItem :elevation="l.value" href="#aifr" symbol="AIFR" price="1.0104" change="+0.84%" color="var(--chart-4)" />
		<WatchlistItem :elevation="l.value" href="#atls" symbol="ATLS" price="0.9893" change="−0.64%" color="var(--chart-3)" />
	</div>
		</div>
	</div>
</template>

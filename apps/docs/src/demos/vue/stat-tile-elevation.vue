<script setup lang="ts">
import { StatStrip, StatStripItem, StatTile } from "@edmi-vue/ui/stat-tile";

const meter = {
	value: 23 / 30,
	zones: [
		{ upTo: 14 / 30, color: "var(--chart-1)" },
		{ upTo: 24 / 30, color: "var(--chart-3)" },
		{ upTo: 1, color: "var(--chart-5)" },
	],
};

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
	<div class="flex flex-col gap-4">
		<div class="flex flex-wrap gap-4">
			<StatTile :elevation="l.value" label="AUM" value="$49,182" delta="+37%" delta-label="vs last week" />
			<StatTile :elevation="l.value"
				label="Daily active holders"
				value="10,291"
				:meter="meter"
				delta="+8%"
				delta-label="vs last week"
			/>
			<StatTile :elevation="l.value" label="Net flow" value="−$1,204" delta="−4.2%" delta-label="vs last week" />
		</div>
		<StatStrip>
			<StatStripItem value="412" label="holders" />
			<StatStripItem value="$49.2K" label="AUM" />
			<StatStripItem value="63%" label="activity off-hours" />
			<StatStripItem value="14" label="indexes" />
		</StatStrip>
	</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TickerStrip } from "@edmi-vue/ui/ticker-strip";

const items = [
	{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
	{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
	{ symbol: "TSLAx", price: "$370.21", change: "−0.31%" },
	{ symbol: "MSFTx", price: "$513.15", change: "+0.12%" },
	{ symbol: "SPYx", price: "$767.86", change: "+0.30%" },
];

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
	<TickerStrip :elevation="l.value" :items="items" />
		</div>
	</div>
</template>

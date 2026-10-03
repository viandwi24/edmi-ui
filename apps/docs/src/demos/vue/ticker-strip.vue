<script setup lang="ts">
import { TickerStrip } from "@edmi-vue/ui/ticker-strip";

const items = [
	{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
	{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
	{ symbol: "TSLAx", price: "$370.21", change: "−0.31%" },
	{ symbol: "MSFTx", price: "$513.15", change: "+0.12%" },
	{ symbol: "SPYx", price: "$767.86", change: "+0.30%" },
];
</script>

<template>
	<TickerStrip :items="items" />
</template>

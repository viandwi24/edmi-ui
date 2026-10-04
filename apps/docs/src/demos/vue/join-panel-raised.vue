<script setup lang="ts">
import { computed, ref } from "vue";
import { JoinPanel } from "@edmi-vue/ui/join-panel";

const amount = ref("1,000");
const n = computed(() => Number(amount.value.replace(/,/g, "")) || 0);
const rows = computed(() => [
	{ label: "Estimated shares", value: (n.value * 0.98209).toFixed(2) },
	{ label: "Fee", value: "1.00%" },
]);
</script>

<template>
	<JoinPanel raised
		v-model:amount="amount"
		label="Amount"
		currency="USDC"
		:rows="rows"
		join-label="Join MAG4"
		:disabled="n === 0"
		@max="amount = '2,500'"
	/>
</template>

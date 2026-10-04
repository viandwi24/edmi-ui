<script setup lang="ts">
import { computed, ref } from "vue";
import { JoinPanel } from "@edmi-vue/ui/join-panel";

const amount = ref("1,000");
const n = computed(() => Number(amount.value.replace(/,/g, "")) || 0);
const rows = computed(() => [
	{ label: "Estimated shares", value: (n.value * 0.98209).toFixed(2) },
	{ label: "Fee", value: "1.00%" },
]);

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
	<JoinPanel :elevation="l.value"
		v-model:amount="amount"
		label="Amount"
		currency="USDC"
		:rows="rows"
		join-label="Join MAG4"
		:disabled="n === 0"
		@max="amount = '2,500'"
	/>
		</div>
	</div>
</template>

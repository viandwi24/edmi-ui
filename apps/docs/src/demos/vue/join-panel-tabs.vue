<script setup lang="ts">
import { computed, ref } from "vue";
import { JoinPanel } from "@edmi-vue/ui/join-panel";

const MAX = 1240;
const tab = ref("join");
const amount = ref("100");
const n = computed(() => Number(amount.value.replace(/,/g, "")) || 0);
const tabs = [
	{ value: "join", label: "Join" },
	{ value: "redeem", label: "Redeem" },
];
const quickAmounts = [
	{ label: "$10", value: "10" },
	{ label: "$50", value: "50" },
	{ label: "$100", value: "100" },
	{ label: "Max" },
];
const isJoin = computed(() => tab.value === "join");
const rows = computed(() => [
	{
		label: isJoin.value ? "Estimated shares" : "Estimated payout",
		value: (n.value * 0.9986).toFixed(2),
	},
	{ label: isJoin.value ? "Entry fee" : "Exit fee", value: "0%" },
]);
</script>

<template>
	<JoinPanel
		v-model:tab="tab"
		v-model:amount="amount"
		:tabs="tabs"
		:label="isJoin ? 'Amount' : 'Shares'"
		:currency="isJoin ? 'USDC' : 'MAG4'"
		amount-size="lg"
		max-label="Max 1,240"
		:quick-amounts="quickAmounts"
		:rows="rows"
		:join-label="`${isJoin ? 'Join' : 'Redeem'} with ${amount || 0} ${isJoin ? 'USDC' : 'MAG4'}`"
		:disabled="n === 0"
		footnote="Self-custodied · Redeem anytime"
		class="w-[380px]"
		@max="amount = MAX.toLocaleString('en-US')"
	/>
</template>

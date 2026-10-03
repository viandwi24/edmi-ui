<script setup lang="ts">
import { ref } from "vue";
import { JoinPanel } from "@edmi-vue/ui/join-panel";

const tab = ref("join");
const amount = ref("100");
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
const rows = [
	{ label: "Estimated shares", value: "99.86" },
	{ label: "Entry fee", value: "0%" },
];
</script>

<template>
	<JoinPanel
		v-model:tab="tab"
		v-model:amount="amount"
		:tabs="tabs"
		amount-size="lg"
		max-label="Max 1,240"
		:quick-amounts="quickAmounts"
		:rows="rows"
		:join-label="`${tab === 'join' ? 'Join' : 'Redeem'} with ${amount || 0} USDC`"
		footnote="Self-custodied · Redeem anytime"
		class="w-[380px]"
		@max="amount = '1240'"
	/>
</template>

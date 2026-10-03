<script setup lang="ts">
import { AllocationBar } from "@edmi-vue/ui/allocation-bar";

const segments = [
	{ label: "AAPLx", value: 40 },
	{ label: "NVDAx", value: 30 },
	{ label: "TSLAx", value: 20 },
	{ label: "SPACEX-pre", value: 10 },
];
</script>

<template>
	<AllocationBar class="max-w-md" :segments="segments" />
</template>

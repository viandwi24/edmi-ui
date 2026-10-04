<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-reasoning",
	"ai-chain-of-thought",
	"ai-tool",
	"ai-tool-elevation",
	"ai-confirmation",
	"ai-confirmation-elevation",
	"ai-sources",
	"ai-inline-citation",
	"ai-plan",
	"ai-plan-elevation",
	"ai-task",
	"ai-queue",
	"ai-checkpoint",
];
</script>

<template>
	<DemoList :names="names" />
</template>

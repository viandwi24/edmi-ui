<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-reasoning",
	"ai-chain-of-thought",
	"ai-tool",
	"ai-tool-raised",
	"ai-confirmation",
	"ai-confirmation-raised",
	"ai-sources",
	"ai-inline-citation",
	"ai-plan",
	"ai-plan-raised",
	"ai-task",
	"ai-queue",
	"ai-checkpoint",
];
</script>

<template>
	<DemoList :names="names" />
</template>

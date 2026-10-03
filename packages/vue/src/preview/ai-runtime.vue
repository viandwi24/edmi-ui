<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-sandbox",
	"ai-schema-display",
	"ai-snippet",
	"ai-stack-trace",
	"ai-terminal",
	"ai-test-results",
	"ai-web-preview",
];
</script>

<template>
	<DemoList :names="names" />
</template>

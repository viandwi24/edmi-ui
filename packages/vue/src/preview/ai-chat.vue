<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-conversation",
	"ai-conversation-empty",
	"ai-message",
	"ai-message-branch",
	"ai-message-agent",
	"ai-prompt-input",
	"ai-prompt-input-elevation",
	"ai-suggestion",
	"ai-suggestion-elevation",
	"ai-attachments",
	"ai-model-selector",
	"ai-context",
	"ai-shimmer",
];
</script>

<template>
	<DemoList :names="names" />
</template>

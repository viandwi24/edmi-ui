<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-artifact-card",
	"ai-artifact-card-raised",
	"ai-artifact-stack",
	"ai-artifact-viewer",
	"ai-session-panel",
	"ai-agent-avatar",
	"ai-chat-composer",
	"ai-prompt-input-agent",
	"ai-prompt-input-agent-raised",
	"ai-chat-header",
];
</script>

<template>
	<DemoList :names="names" />
</template>

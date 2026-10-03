<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["ai-canvas", "ai-node", "ai-node-raised", "ai-edge", "ai-connection", "ai-controls", "ai-panel", "ai-toolbar", "ai-image", "ai-open-in-chat"];
</script>

<template>
	<DemoList :names="names" />
</template>

<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["ai-canvas", "ai-node", "ai-node-raised", "ai-edge", "ai-connection", "ai-controls", "ai-panel", "ai-toolbar", "ai-image", "ai-open-in-chat"];
</script>

<template>
	<!-- Tailwind only scans src/ and registry/ here: list the docs-demo-only classes so the sized canvases render. -->
	<span class="hidden h-[420px] h-56 h-64 h-72 w-72 w-full rounded-[calc(var(--radius)*1.4)] aspect-[3/2] size-4 animate-spin border-t-transparent opacity-60 w-40 border-b-0 px-3 py-2.5 text-xs" />
	<DemoList :names="names" />
</template>

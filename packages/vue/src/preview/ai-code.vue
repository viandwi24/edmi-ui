<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-agent",
	"ai-agent-raised",
	"ai-artifact",
	"ai-artifact-raised",
	"ai-code-block",
	"ai-commit",
	"ai-environment-variables",
	"ai-file-tree",
	"ai-jsx-preview",
	"ai-package-info",
];
</script>

<template>
	<!-- Tailwind only scans src/ and registry/ here, so list the docs-demo-only classes (jsx strings, layout): max-w-lg max-w-xl max-w-md max-w-3xl max-w-sm w-72 gap-5 gap-2.5 sm:grid-cols-2 grid mt-0.5 mt-2 mt-3.5 h-3 h-[34px] w-48 w-32 text-xs rounded-none border-0 -->
	<DemoList :names="names" />
</template>

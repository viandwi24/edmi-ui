<script setup lang="ts">
import { CodeBlock } from "@edmi-vue/ui/code-block";

const code = "claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp";

const levels = [
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <CodeBlock :elevation="l.value" class="w-[420px] max-w-full" title="Claude Code" :code="code" :highlight-lines="[2]" />
		</div>
	</div>
</template>

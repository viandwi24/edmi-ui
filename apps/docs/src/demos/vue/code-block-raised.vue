<script setup lang="ts">
import { CodeBlock } from "@edmi-vue/ui/code-block";

const code = "claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp";
</script>

<template>
  <CodeBlock raised class="w-[420px] max-w-full" title="Claude Code" :code="code" :highlight-lines="[2]" />
</template>

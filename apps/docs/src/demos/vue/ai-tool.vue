<script setup lang="ts">
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@edmi-vue/components/ai/tool";

const input = { symbol: "NVDAx", window: "30d" };
const states = [
  "input-streaming",
  "input-available",
  "approval-requested",
  "approval-responded",
  "output-denied",
] as const;
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <Tool default-open>
      <ToolHeader type="tool-get_prices" state="output-available" />
      <ToolContent>
        <ToolInput :input="input" />
        <ToolOutput :output="{ price: 188.2, change: 0.024 }" :error-text="undefined" />
      </ToolContent>
    </Tool>
    <Tool default-open>
      <ToolHeader type="tool-get_prices" state="output-error" />
      <ToolContent>
        <ToolInput :input="input" />
        <ToolOutput :output="undefined" error-text="Rate limit: retry in 20 s" />
      </ToolContent>
    </Tool>
    <Tool v-for="state in states" :key="state">
      <ToolHeader type="tool-get_prices" :state="state" />
      <ToolContent>
        <ToolInput :input="input" />
      </ToolContent>
    </Tool>
  </div>
</template>

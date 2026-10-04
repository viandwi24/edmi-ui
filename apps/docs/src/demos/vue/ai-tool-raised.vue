<script setup lang="ts">
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@edmi-vue/components/ai/tool";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Tool :elevation="level.value" default-open class="max-w-md">
        <ToolHeader type="tool-get_prices" state="output-available" />
        <ToolContent>
          <ToolInput :input="{ symbol: 'NVDAx', window: '30d' }" />
          <ToolOutput :output="{ price: 188.2, change: 0.024 }" :error-text="undefined" />
        </ToolContent>
      </Tool>
    </div>
  </div>
</template>

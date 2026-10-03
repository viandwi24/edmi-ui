<script setup lang="ts">
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";
</script>

<template>
  <PromptInput raised initial-input="Rebalance MAG4" class="max-w-xl" @submit="() => {}">
    <PromptInputBody>
      <PromptInputTextarea />
    </PromptInputBody>
    <PromptInputFooter>
      <PromptInputTools />
      <PromptInputSubmit status="ready" />
    </PromptInputFooter>
  </PromptInput>
</template>

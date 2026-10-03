<script setup lang="ts">
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@edmi-vue/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-vue/components/ai/prompt-input-agent";
</script>

<template>
  <PromptInput raised class="max-w-xl [&_[data-slot=input-group]]:bg-muted">
    <PromptInputHeader>
      <PromptInputAgent :agent="{ id: 'keeper', name: 'Keeper', color: 'chart-3' }" />
    </PromptInputHeader>
    <PromptInputBody>
      <PromptInputTextarea class="min-h-20" placeholder="Ask Keeper anything about your index…" />
    </PromptInputBody>
    <PromptInputFooter>
      <PromptInputTools />
      <PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
    </PromptInputFooter>
  </PromptInput>
</template>

<script setup lang="ts">
import { Suggestion, Suggestions } from "@edmi-vue/components/ai/suggestion";

const prompts = [
  "What moved NVDAx today?",
  "Compare MAG4 vs SPYx",
  "Explain the keeper",
  "Show my fees",
];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-4">
    <Suggestions>
      <Suggestion v-for="p in prompts" :key="p" :suggestion="p" />
    </Suggestions>
    <div class="flex flex-wrap gap-2">
      <Suggestion suggestion="Rebalance now" variant="card">Check drift and propose trades</Suggestion>
      <Suggestion suggestion="Draft a post" variant="card">Write an update for the feed</Suggestion>
    </div>
  </div>
</template>

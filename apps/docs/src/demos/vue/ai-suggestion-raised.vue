<script setup lang="ts">
import { Suggestion } from "@edmi-vue/components/ai/suggestion";
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Suggestion suggestion="Rebalance now" raised />
    <Suggestion suggestion="Draft a post" raised />
    <Suggestion suggestion="Explain the keeper" variant="card" raised>How rebalancing works</Suggestion>
  </div>
</template>

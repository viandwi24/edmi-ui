<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@edmi-vue/components/ai/reasoning";
import { computed, onBeforeUnmount, ref } from "vue";

const text =
  "NVDAx is 2.4% over target. The keeper limit is 2%, so a rebalance is allowed. Slippage on 0.42 NVDAx at current depth is about 0.08%.";

// Streams the text in, then flips `isStreaming` off: the block opens while streaming and closes itself afterwards.
const shown = ref(0);
const streaming = ref(true);
const id = setInterval(() => {
  shown.value += 3;
  if (shown.value >= text.length) {
    streaming.value = false;
    clearInterval(id);
  }
}, 40);
onBeforeUnmount(() => clearInterval(id));
const partial = computed(() => text.slice(0, shown.value));
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <Reasoning :is-streaming="streaming">
      <ReasoningTrigger />
      <ReasoningContent :content="partial" />
    </Reasoning>
    <Reasoning :default-open="false" :duration="6">
      <ReasoningTrigger />
      <ReasoningContent :content="text" />
    </Reasoning>
  </div>
</template>

<script setup lang="ts">
import { Transcription, TranscriptionSegment } from "@edmi-vue/components/ai/transcription";
import { onBeforeUnmount, ref, watch } from "vue";

// Segments as the AI SDK `transcribe()` returns them.
const lines = [
  "So the keeper checks drift",
  "every hour,",
  "and when NVDAx is more than two percent",
  "over its weight",
  "it asks you to approve a rebalance.",
];
const segments = lines.map((text, i) => ({ text, startSecond: i * 2.4, endSecond: (i + 1) * 2.4 }));

const time = ref(4);
const playing = ref(false);
let raf = 0;

// Stand-in for an <audio> element's `timeupdate`: advance the clock while playing.
watch(playing, (on) => {
  cancelAnimationFrame(raf);
  if (!on) return;
  let last = performance.now();
  const tick = (now: number) => {
    time.value = (time.value + (now - last) / 1000) % 12;
    last = now;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
});
onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-3">
    <button
      type="button"
      class="self-start rounded-md border border-border px-3 py-1 text-sm hover:bg-accent"
      @click="playing = !playing"
    >
      {{ playing ? "Pause" : "Play" }} · <span class="font-mono">{{ time.toFixed(1) }}s</span>
    </button>
    <Transcription v-model:current-time="time" :segments="segments">
      <template #default="{ segment, index }">
        <TranscriptionSegment :segment="segment" :index="index" />
      </template>
    </Transcription>
  </div>
</template>

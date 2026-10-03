<script setup lang="ts">
import { SpeechInput } from "@edmi-vue/components/ai/speech-input";
import { ref } from "vue";

const text = ref("");
// Browsers without the Web Speech API (Firefox) record and call this to transcribe.
const transcribe = async () => "Rebalance MAG4 when drift is above 2%.";
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <div class="flex items-center gap-3">
      <SpeechInput
        :on-audio-recorded="transcribe"
        @transcription-change="(t) => (text = `${text} ${t}`.trim())"
      />
      <span class="text-xs text-muted-foreground">Click to dictate (Chrome, Edge, Safari) or record.</span>
    </div>
    <p class="min-h-5 text-sm">{{ text }}</p>
  </div>
</template>

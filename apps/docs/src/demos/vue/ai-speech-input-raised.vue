<script setup lang="ts">
import { SpeechInput } from "@edmi-vue/components/ai/speech-input";

const noop = async () => "";
</script>

<template>
  <div class="flex items-center gap-3">
    <SpeechInput raised :on-audio-recorded="noop" />
    <SpeechInput raised variant="default" :on-audio-recorded="noop" />
  </div>
</template>

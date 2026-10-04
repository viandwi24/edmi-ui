<script setup lang="ts">
import { SpeechInput } from "@edmi-vue/components/ai/speech-input";

const noop = async () => "";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex items-center gap-3">
        <SpeechInput :elevation="level.value" :on-audio-recorded="noop" />
        <SpeechInput :elevation="level.value" variant="default" :on-audio-recorded="noop" />
      </div>
    </div>
  </div>
</template>

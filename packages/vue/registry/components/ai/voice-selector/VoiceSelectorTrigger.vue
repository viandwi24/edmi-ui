<script setup lang="ts">
import type { DialogTriggerProps } from "reka-ui"
import { DialogTrigger } from "@/registry/edmi/ui/dialog"

// Pass the visible trigger as the slot with `as-child`, e.g. `<VoiceSelectorTrigger as-child><Button variant="outline" /></VoiceSelectorTrigger>`.
const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <DialogTrigger data-slot="ai-voice-selector-trigger" v-bind="props">
    <slot />
  </DialogTrigger>
</template>

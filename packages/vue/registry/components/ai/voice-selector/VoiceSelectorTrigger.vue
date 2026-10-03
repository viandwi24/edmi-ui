<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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

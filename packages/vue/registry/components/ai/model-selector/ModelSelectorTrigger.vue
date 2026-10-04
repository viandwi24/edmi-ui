<script setup lang="ts">
import type { DialogTriggerProps } from "reka-ui"
import { DialogTrigger } from "@/registry/edmi/ui/dialog"

// Pass the visible trigger with `as-child`, e.g. <ModelSelectorTrigger as-child><Button variant="outline" /></ModelSelectorTrigger>.
const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <DialogTrigger data-slot="ai-model-selector-trigger" v-bind="props">
    <slot />
  </DialogTrigger>
</template>

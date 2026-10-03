<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// Renders the slot, falling back to the value as text.
const props = defineProps<{
  value?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="ai-voice-selector-accent"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot>{{ props.value }}</slot>
  </span>
</template>

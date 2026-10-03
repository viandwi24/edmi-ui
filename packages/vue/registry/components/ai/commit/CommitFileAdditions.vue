<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// `+12`; always rendered (`+0` stays visible, board AI 05).
const props = defineProps<{
  count: number
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span :class="cn('text-success-text', props.class)">
    <slot>+{{ props.count }}</slot>
  </span>
</template>

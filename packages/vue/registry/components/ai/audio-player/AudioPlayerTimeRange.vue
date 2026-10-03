<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <component
    :is="'media-time-range'"
    data-slot="ai-audio-player-time-range"
    :class="cn('h-7 min-w-0 flex-1 px-1', props.class)"
  />
</template>

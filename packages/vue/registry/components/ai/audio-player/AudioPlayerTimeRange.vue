<script setup lang="ts">
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

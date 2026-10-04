<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <component
    :is="'media-volume-range'"
    data-slot="ai-audio-player-volume-range"
    :class="cn('h-7 w-[70px] px-1', props.class)"
  />
</template>

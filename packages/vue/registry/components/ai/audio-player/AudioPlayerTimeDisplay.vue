<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <component
    :is="'media-time-display'"
    data-slot="ai-audio-player-time-display"
    :class="cn('font-mono text-xs text-foreground tabular-nums [--media-font:var(--font-mono)]', props.class)"
  />
</template>

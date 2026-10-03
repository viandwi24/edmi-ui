<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <component
    :is="'media-duration-display'"
    data-slot="ai-audio-player-duration-display"
    :class="cn('font-mono text-xs text-muted-foreground tabular-nums [--media-font:var(--font-mono)] [--media-text-color:var(--muted-foreground)]', props.class)"
  />
</template>

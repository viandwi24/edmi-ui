<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="ai-voice-selector-age"
    :class="cn('text-xs text-muted-foreground tabular-nums', props.class)"
  >
    <slot />
  </span>
</template>

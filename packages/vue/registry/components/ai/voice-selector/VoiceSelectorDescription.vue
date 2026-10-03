<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="ai-voice-selector-description"
    :class="cn('text-[12.5px] text-muted-foreground', props.class)"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <component
    :is="'media-control-bar'"
    data-slot="ai-audio-player-control-bar"
    :class="cn('flex w-full items-center gap-2', props.class)"
  >
    <slot />
  </component>
</template>

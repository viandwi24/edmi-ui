<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"] }>(), {})
</script>

<template>
  <component
    :is="'media-play-button'"
    data-slot="ai-audio-player-play-button"
    :class="cn(buttonVariants({ variant: 'default', size: 'icon' }), 'rounded-full', props.class)"
  />
</template>

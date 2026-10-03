<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"] }>(), {})
</script>

<template>
  <component
    :is="'media-mute-button'"
    data-slot="ai-audio-player-mute-button"
    :class="cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), props.class)"
  />
</template>

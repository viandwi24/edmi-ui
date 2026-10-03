<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"], seekOffset?: number }>(), {seekOffset: 10})
</script>

<template>
  <component
    :is="'media-seek-forward-button'"
    data-slot="ai-audio-player-seek-forward-button"
    :seekoffset="props.seekOffset"
    :class="cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), props.class)"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"], seekOffset?: number }>(), {seekOffset: 10})
</script>

<template>
  <component
    :is="'media-seek-backward-button'"
    data-slot="ai-audio-player-seek-backward-button"
    :seekoffset="props.seekOffset"
    :class="cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), props.class)"
  />
</template>

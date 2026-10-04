<script setup lang="ts">
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

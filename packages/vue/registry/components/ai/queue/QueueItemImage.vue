<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  class?: HTMLAttributes["class"]
}>(), {
  alt: "",
})
</script>

<template>
  <img
    data-slot="ai-queue-item-image"
    :src="src"
    :alt="alt"
    width="32"
    height="32"
    :class="cn('size-8 rounded-md border border-border object-cover', props.class)"
  >
</template>

<script setup lang="ts">
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

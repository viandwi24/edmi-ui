<script setup lang="ts">
import type { Experimental_GeneratedImage } from "ai"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

/** AI SDK generated image as a responsive img (base64 + media type). Loading state belongs to the parent. */
interface Props extends Experimental_GeneratedImage {
  class?: HTMLAttributes["class"]
  alt?: string
}

const props = defineProps<Props>()

const classes = computed(() => cn(
  "h-auto max-w-full overflow-hidden rounded-xl border border-border",
  props.class,
))

const src = computed(() => `data:${props.mediaType};base64,${props.base64}`)
</script>

<template>
  <img data-slot="ai-image" :class="classes" :src="src" :alt="props.alt">
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  /** A models.dev provider id (`anthropic`, `openai`, `google`, ...); any string works. */
  provider: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <img
    :alt="`${props.provider} logo`"
    :class="cn('size-3.5 dark:invert', props.class)"
    height="14"
    :src="`https://models.dev/logos/${props.provider}.svg`"
    width="14"
  >
</template>

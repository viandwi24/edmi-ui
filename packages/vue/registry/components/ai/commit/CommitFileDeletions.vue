<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  count: number
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span :class="cn('text-destructive-text', props.class)">
    <slot>−{{ props.count }}</slot>
  </span>
</template>

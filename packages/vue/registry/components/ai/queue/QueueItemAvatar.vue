<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span data-slot="ai-queue-item-avatar" :class="cn('flex shrink-0 items-center', props.class)">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  completed?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  completed: false,
})
</script>

<template>
  <span
    data-slot="ai-queue-item-indicator"
    :class="cn(
      'mt-0.5 inline-block size-3.5 shrink-0 rounded-full border-[1.5px]',
      props.completed
        ? 'border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] bg-success-soft'
        : 'border-muted-foreground-2',
      props.class,
    )"
  />
</template>

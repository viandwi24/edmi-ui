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
    data-slot="ai-queue-item-content"
    :class="cn(
      'line-clamp-1 grow break-words',
      props.completed ? 'text-muted-foreground-2 line-through' : 'text-foreground',
      props.class,
    )"
  >
    <slot />
  </span>
</template>

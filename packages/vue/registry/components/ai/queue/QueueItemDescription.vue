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
  <div
    data-slot="ai-queue-item-description"
    :class="cn(
      'ml-[22px] text-xs',
      props.completed ? 'text-muted-foreground-2 line-through' : 'text-muted-foreground',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

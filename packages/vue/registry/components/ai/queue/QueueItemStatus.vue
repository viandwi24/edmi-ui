<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span data-slot="ai-queue-item-status" :class="cn('flex shrink-0 items-center gap-2 text-xs text-muted-foreground', props.class)">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Format shown after the title in mono (`PDF`). */
  format?: string
}>()
</script>

<template>
  <span data-slot="ai-artifact-viewer-title" :class="cn('min-w-0 flex-1 truncate text-sm', props.class)">
    <slot />
    <span v-if="format" class="font-mono text-muted-foreground"> · {{ format }}</span>
  </span>
</template>

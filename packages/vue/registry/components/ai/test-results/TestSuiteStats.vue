<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  passed?: number
  failed?: number
  skipped?: number
  class?: HTMLAttributes["class"]
}>(), {
  passed: 0,
  failed: 0,
  skipped: 0,
})
</script>

<template>
  <div :class="cn('ml-auto flex items-center gap-2 text-xs', props.class)">
    <slot>
      <span v-if="props.passed > 0" class="text-success-text">{{ props.passed }} passed</span>
      <span v-if="props.failed > 0" class="text-destructive-text">{{ props.failed }} failed</span>
      <span v-if="props.skipped > 0" class="text-warning-text">{{ props.skipped }} skipped</span>
    </slot>
  </div>
</template>

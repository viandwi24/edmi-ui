<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { formatDuration, useTestResultsContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const context = useTestResultsContext()
</script>

<template>
  <span
    v-if="context.summary?.duration"
    :class="cn('font-mono text-xs text-muted-foreground', props.class)"
  >
    <slot>{{ formatDuration(context.summary.duration) }}</slot>
  </span>
</template>

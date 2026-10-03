<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { progressPercentKey } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const percent = inject(progressPercentKey, undefined)
</script>

<template>
  <span
    data-slot="progress-value"
    :class="cn('ml-auto font-mono text-[13px] text-muted-foreground tabular-nums', props.class)"
  >
    <slot>{{ percent == null ? "" : `${percent}%` }}</slot>
  </span>
</template>

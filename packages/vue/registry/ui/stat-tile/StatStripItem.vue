<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  value?: string | number
  label?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="stat-strip-item"
    :class="cn('min-w-[140px] flex-1 border-border px-[22px] py-4 not-first:border-l', props.class)"
  >
    <div class="font-mono text-2xl">
      <slot name="value">{{ value }}</slot>
    </div>
    <div class="mt-1 text-xs text-muted-foreground">
      <slot name="label">{{ label }}</slot>
    </div>
  </div>
</template>

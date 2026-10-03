<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  data: number[]
  /** Defaults to the direction of the series (last vs first). */
  tone?: 'up' | 'down'
  width?: number
  height?: number
  class?: HTMLAttributes['class']
}>(), {
  width: 88,
  height: 28,
})

const points = computed(() => {
  const { data, width, height } = props
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pad = 2
  return data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2)
      const y = pad + (1 - (v - min) / span) * (height - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})
const down = computed(() =>
  props.tone ? props.tone === 'down' : (props.data.at(-1) ?? 0) < (props.data[0] ?? 0),
)
</script>

<template>
  <!-- Tiny trend line. -->
  <svg
    v-if="data.length >= 2"
    data-slot="sparkline"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    aria-hidden="true"
    :class="cn('inline-block', down ? 'text-destructive-text' : 'text-brand-text', props.class)"
  >
    <polyline
      :points="points"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

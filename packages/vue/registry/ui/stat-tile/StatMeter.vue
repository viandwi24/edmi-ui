<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MeterZone } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  value: number
  steps?: number
  zones?: MeterZone[]
  class?: HTMLAttributes['class']
}>(), {
  steps: 30,
  zones: () => [
    { upTo: 0.5, color: 'var(--chart-1)' },
    { upTo: 0.8, color: 'var(--chart-3)' },
    { upTo: 1, color: 'var(--chart-5)' },
  ],
})

// Segmented meter: `steps` flat bars, filled up to `value` (0..1), the rest dimmed.
const bars = computed(() =>
  Array.from({ length: props.steps }, (_, i) => {
    const at = (i + 1) / props.steps
    const zone = props.zones.find(z => at <= z.upTo) ?? props.zones[props.zones.length - 1]
    return { dim: at > props.value, color: zone?.color }
  }),
)
</script>

<template>
  <div
    data-slot="stat-meter"
    role="meter"
    aria-valuemin="0"
    aria-valuemax="1"
    :aria-valuenow="value"
    :class="cn('flex gap-0.5', props.class)"
  >
    <span
      v-for="(b, i) in bars"
      :key="i"
      :class="cn('h-[7px] flex-1', b.dim && 'opacity-30')"
      :style="{ background: b.color }"
    />
  </div>
</template>

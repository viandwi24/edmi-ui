<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { MeterZone } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Badge } from '@/registry/edmi/ui/badge'
import { Card } from '@/registry/edmi/ui/card'
import StatMeter from './StatMeter.vue'

const props = defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  label?: string
  value?: string | number
  delta?: string
  deltaLabel?: string
  /** Overrides the sign-based direction of `delta`. */
  trend?: 'up' | 'down'
  /** Segmented meter under the value. */
  meter?: { value: number, steps?: number, zones?: MeterZone[], class?: HTMLAttributes['class'] }
  class?: HTMLAttributes['class']
}>()

const down = computed(() =>
  props.trend ? props.trend === 'down' : props.delta ? /^[-−–]/.test(props.delta.trim()) : false,
)
</script>

<template>
  <!-- KPI tile: label, mono value, delta badge (+ optional meter). Delta direction comes from its sign. -->
  <Card :raised="raised" data-slot="stat-tile" :class="cn('w-60 gap-0 px-5 py-[18px]', props.class)">
    <div class="text-[13px] text-muted-foreground">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="mt-1.5 font-mono text-[28px] leading-tight tracking-[-0.5px]">
      <slot name="value">{{ value }}</slot>
    </div>
    <StatMeter
      v-if="meter"
      v-bind="meter"
      :class="cn('mt-2.5', meter.class)"
    />
    <div v-if="delta" class="mt-2.5 flex items-center gap-2">
      <Badge :variant="down ? 'destructive' : 'brand'" shape="number" class="px-[7px]">
        {{ delta }}
      </Badge>
      <span v-if="deltaLabel" class="text-xs text-muted-foreground">{{ deltaLabel }}</span>
    </div>
    <slot />
  </Card>
</template>

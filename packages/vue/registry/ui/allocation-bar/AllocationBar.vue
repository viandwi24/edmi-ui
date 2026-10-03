<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AllocationSegment } from '.'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  segments: AllocationSegment[]
  showLegend?: boolean
  class?: HTMLAttributes['class']
}>(), {
  showLegend: true,
})

const colored = computed(() =>
  props.segments.map((s, i) => ({ ...s, color: s.color ?? `var(--chart-${(i % 5) + 1})` })),
)
</script>

<template>
  <!-- Weights bar with a legend of label + mono percentage. -->
  <div data-slot="allocation-bar" :class="cn('w-full', props.class)">
    <div
      class="flex gap-[3px]"
      role="img"
      :aria-label="colored.map(s => `${s.label} ${s.value}%`).join(', ')"
    >
      <span
        v-for="s in colored"
        :key="s.label"
        class="h-2.5 rounded-full"
        :style="{ flex: s.value, background: s.color }"
      />
    </div>
    <ul v-if="showLegend" class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px]">
      <li v-for="s in colored" :key="s.label" class="flex items-center gap-1.5">
        <span class="size-[9px] rounded-[3px]" :style="{ background: s.color }" />
        {{ s.label }}
        <b class="font-mono font-medium">{{ s.value }}%</b>
      </li>
    </ul>
  </div>
</template>

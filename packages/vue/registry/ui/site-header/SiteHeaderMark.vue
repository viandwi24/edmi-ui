<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChartLineIcon } from '@lucide/vue'
import { computed } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(defineProps<{
  /** ✦ raised +1 / floating +2 give the mark the raised face */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'handle')
const raised = computed(() => level.value === 'raised' || level.value === 'floating')
</script>

<template>
  <!-- Dark tile with a chart glyph: the Stockbreak mark. Use the `logo` slot of the brand/header to replace it. -->
  <span
    data-slot="site-header-mark"
    :class="cn(
      'inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground',
      raised && '[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]',
      props.class,
    )"
  >
    <ChartLineIcon class="size-[15px]" />
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, provideSurface, useElevation } from '@/registry/edmi/ui/elevation'
import { INSET_PANEL_KEY, insetPanelElevation } from './context'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ depth: sunken -1, flat 0, raised +1 (body plate bevels), floating +2 (shell also drops) */
  elevation?: Elevation
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, 'surface')
provideSurface(() => level.value)
provide(INSET_PANEL_KEY, { get value() { return level.value } })
</script>

<template>
  <div
    data-slot="inset-panel"
    :class="cn('group/inset-panel flex flex-col overflow-hidden rounded-2xl border border-border bg-muted', insetPanelElevation[level].root, props.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, provideSurface, useElevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: 'default' | 'sm'
  /** ✦ depth: sunken -1, flat 0, raised +1 (bevel), floating +2 (bevel + drop) */
  elevation?: Elevation
}>(), {
  size: 'default',
  elevation: undefined,
})

// ✦ depth (v4): surface role. A card inside a raised/floating surface resolves flat (no bevel on bevel).
const cardElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const level = useElevation(() => props.elevation, 'surface')
provideSurface(() => level.value)
</script>

<template>
  <div
    data-slot="card"
    :data-size="size"
    :class="cn('group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:22px] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:16px] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl', cardElevation[level], props.class)"
  >
    <slot />
  </div>
</template>

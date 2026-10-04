<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { badgeVariants } from '.'

const props = withDefaults(defineProps<PrimitiveProps & {
  variant?: BadgeVariants['variant']
  /** ✦ Edmi addition */
  shape?: BadgeVariants['shape']
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 (fill and tint stay) */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), { elevation: undefined })

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'shape', 'elevation')
const level = useElevation(() => props.elevation, 'control')
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant, shape, elevation: level }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

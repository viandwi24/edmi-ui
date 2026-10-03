<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'

const props = defineProps<PrimitiveProps & {
  variant?: BadgeVariants['variant']
  /** ✦ Edmi addition */
  shape?: BadgeVariants['shape']
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'shape')
</script>

<template>
  <Primitive
    data-slot="badge"
    :data-variant="variant"
    :class="cn(badgeVariants({ variant, shape }), props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </Primitive>
</template>

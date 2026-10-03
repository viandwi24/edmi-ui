<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ItemMediaVariants } from '.'
import { cn } from '@/registry/edmi/lib/utils'
import { itemMediaVariants } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  variant?: ItemMediaVariants['variant']
}>(), {
  variant: 'default',
})
</script>

<template>
  <div
    data-slot="item-media"
    :data-variant="variant"
    :class="cn(itemMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>

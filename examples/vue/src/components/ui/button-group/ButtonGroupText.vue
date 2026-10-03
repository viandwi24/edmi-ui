<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    data-slot="button-group-text"
    :as="as"
    :as-child="asChild"
    :class="cn(`flex items-center gap-2 rounded-lg border border-input bg-muted px-2.5 text-[13px] font-medium text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`, props.class)"
  >
    <slot />
  </Primitive>
</template>

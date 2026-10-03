<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { AccordionVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { AccordionRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import { accordionVariants } from '.'

// Reka needs `type="single" | "multiple"` (React: `multiple` prop). ✦ `variant="card"` raises the list into a card.
const props = withDefaults(
  defineProps<AccordionRootProps & { class?: HTMLAttributes['class'], variant?: AccordionVariants['variant'] }>(),
  { variant: 'default' },
)
const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion"
    :data-variant="variant"
    v-bind="forwarded"
    :class="cn(accordionVariants({ variant }), props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>

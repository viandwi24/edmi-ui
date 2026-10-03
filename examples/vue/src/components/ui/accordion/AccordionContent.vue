<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="overflow-hidden text-[13.5px] leading-relaxed text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div
      :class="cn('pb-4 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4', props.class)"
    >
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="
        cn(
          'group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 py-3.5 text-left text-[14px] font-medium outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <PhCaretDown data-slot="accordion-trigger-icon" class="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

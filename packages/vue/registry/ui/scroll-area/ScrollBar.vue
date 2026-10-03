<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <!-- Thin track-less bar: a 6px --input pill (kit.css .scrollbar). -->
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    v-bind="delegatedProps"
    :class="
      cn(
        'flex touch-none select-none p-[3px] transition-opacity',
        orientation === 'vertical' && 'h-full w-3',
        orientation === 'horizontal' && 'h-3 flex-col',
        props.class,
      )
    "
  >
    <ScrollAreaThumb
      data-slot="scroll-area-thumb"
      class="relative flex-1 rounded-full bg-input"
    />
  </ScrollAreaScrollbar>
</template>

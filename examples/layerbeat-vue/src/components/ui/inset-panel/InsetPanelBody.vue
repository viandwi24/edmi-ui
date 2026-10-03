<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** Bottom fade into the card colour. */
  fade?: boolean
}>(), {
  fade: false,
})
</script>

<template>
  <div
    data-slot="inset-panel-body"
    :data-fade="fade || undefined"
    :class="cn(
      'relative -mx-px flex-1 overflow-hidden rounded-t-xl border border-b-0 border-border bg-card',
      // no footer: the body runs to the bottom edge
      'group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0 not-group-has-[[data-slot=inset-panel-footer]]/inset-panel:-mb-px',
      'data-[fade]:after:pointer-events-none data-[fade]:after:absolute data-[fade]:after:inset-x-0 data-[fade]:after:bottom-0 data-[fade]:after:h-14 data-[fade]:after:bg-linear-to-b data-[fade]:after:from-transparent data-[fade]:after:to-card',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

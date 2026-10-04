<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { INSET_PANEL_KEY, insetPanelElevation } from './context'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** Bottom fade into the card colour. */
  fade?: boolean
}>(), {
  fade: false,
})

const panel = inject(INSET_PANEL_KEY, undefined)
</script>

<template>
  <div
    data-slot="inset-panel-body"
    :data-fade="fade || undefined"
    :class="cn(
      'relative mx-0.5 mb-0.5 flex-1 overflow-hidden rounded-xl border border-border bg-card',
      // footer: it sits right under the body, so no bottom gap
      'group-has-[[data-slot=inset-panel-footer]]/inset-panel:mb-0',
      insetPanelElevation[panel?.value ?? 'flat'].body,
      'data-[fade]:after:pointer-events-none data-[fade]:after:absolute data-[fade]:after:inset-x-0 data-[fade]:after:bottom-0 data-[fade]:after:h-14 data-[fade]:after:bg-linear-to-b data-[fade]:after:from-transparent data-[fade]:after:to-card',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

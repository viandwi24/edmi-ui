<script setup lang="ts">
import type { DrawerContentEmits, DrawerContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  DrawerContent,
  DrawerPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import DrawerOverlay from './DrawerOverlay.vue'
import DrawerSwipeHandle from './DrawerSwipeHandle.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DrawerContentProps & {
  class?: HTMLAttributes['class']
  /** Render a DrawerSwipeHandle at the top (default for the bottom drawer). */
  showHandle?: boolean
}>()
const emits = defineEmits<DrawerContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'showHandle')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      data-slot="drawer-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
        // Flat: 1px border on the edge facing the page.
        'group/drawer-content fixed z-50 flex flex-col gap-4 overflow-y-auto overscroll-contain border-border bg-popover text-sm text-popover-foreground outline-none will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[swiping]:duration-0 data-[state=open]:animate-in data-[state=closed]:animate-out',
        // down = bottom drawer
        'data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[85dvh] data-[swipe-direction=down]:rounded-t-2xl data-[swipe-direction=down]:border-t data-[swipe-direction=down]:[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))] data-[swipe-direction=down]:data-[state=open]:slide-in-from-bottom data-[swipe-direction=down]:data-[state=closed]:slide-out-to-bottom',
        // up = top drawer
        'data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[85dvh] data-[swipe-direction=up]:rounded-b-2xl data-[swipe-direction=up]:border-b data-[swipe-direction=up]:[transform:translateY(var(--drawer-swipe-movement-y,0px))] data-[swipe-direction=up]:data-[state=open]:slide-in-from-top data-[swipe-direction=up]:data-[state=closed]:slide-out-to-top',
        // left = drawer on the left edge (dismissed by swiping left)
        'data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:max-w-sm data-[swipe-direction=left]:rounded-r-2xl data-[swipe-direction=left]:border-r data-[swipe-direction=left]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=left]:data-[state=open]:slide-in-from-left data-[swipe-direction=left]:data-[state=closed]:slide-out-to-left',
        // right = drawer on the right edge
        'data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:max-w-sm data-[swipe-direction=right]:rounded-l-2xl data-[swipe-direction=right]:border-l data-[swipe-direction=right]:[transform:translateX(var(--drawer-swipe-movement-x,0px))] data-[swipe-direction=right]:data-[state=open]:slide-in-from-right data-[swipe-direction=right]:data-[state=closed]:slide-out-to-right',
        props.class,
      )"
    >
      <DrawerSwipeHandle v-if="showHandle" />
      <div
        data-slot="drawer-body"
        class="flex flex-1 flex-col gap-4 p-[22px] pt-0 group-data-[swipe-direction=left]/drawer-content:pt-[22px] group-data-[swipe-direction=right]/drawer-content:pt-[22px]"
      >
        <slot />
      </div>
    </DrawerContent>
  </DrawerPortal>
</template>

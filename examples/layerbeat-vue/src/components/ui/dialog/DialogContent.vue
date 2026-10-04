<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PhX } from '@phosphor-icons/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Elevation, provideSurface, useElevation } from '@/components/ui/elevation'
import DialogOverlay from './DialogOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogContentProps & { class?: HTMLAttributes['class'], showCloseButton?: boolean, elevation?: Elevation }>(), {
  showCloseButton: true,
  elevation: undefined,
})
const emits = defineEmits<DialogContentEmits>()

// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
const overlayElevation = {
  sunken: '',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}
const level = useElevation(() => props.elevation, 'overlay')
provideSurface(() => level.value)

const delegatedProps = reactiveOmit(props, 'class', 'showCloseButton', 'elevation')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // recipes.surface.dialog: 2xl radius, 22px padding, flat by default; `elevation` ✦ adds the bevel / drop.
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-sm text-popover-foreground outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-md',
          overlayElevation[level],
          props.class,
        )"
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        as-child
      >
        <Button
          data-slot="dialog-close"
          variant="ghost"
          size="icon-xs"
          class="absolute top-3.5 right-3.5"
        >
          <PhX />
          <span class="sr-only">Close</span>
        </Button>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

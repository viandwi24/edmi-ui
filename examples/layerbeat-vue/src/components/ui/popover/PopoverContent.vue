<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'
import { type Elevation, provideSurface, useElevation } from '@/components/ui/elevation'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes['class'], elevation?: Elevation }>(),
  {
    elevation: undefined,
    align: 'center',
    sideOffset: 6,
  },
)
const emits = defineEmits<PopoverContentEmits>()

// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
const overlayElevation = {
  sunken: '',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}
const level = useElevation(() => props.elevation, 'overlay')
provideSurface(() => level.value)

const delegatedProps = reactiveOmit(props, 'class', 'elevation')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Flat by default (recipes.surface.popover); `elevation` ✦ adds the bevel / drop.
          'z-50 flex w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) flex-col gap-2.5 rounded-xl border border-border bg-popover p-3 text-sm text-popover-foreground outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          overlayElevation[level],
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

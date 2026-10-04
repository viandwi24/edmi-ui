<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, provideSurface, useElevation } from '@/registry/edmi/ui/elevation'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AlertDialogContentProps & { class?: HTMLAttributes['class'], size?: 'default' | 'sm', elevation?: Elevation }>(), {
  size: 'default',
  elevation: undefined,
})
const emits = defineEmits<AlertDialogContentEmits>()

// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
const overlayElevation = {
  sunken: '',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}
const level = useElevation(() => props.elevation, 'overlay')
provideSurface(() => level.value)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'elevation')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      data-slot="alert-dialog-overlay"
      class="fixed inset-0 isolate z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      :data-size="size"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-[22px] text-popover-foreground outline-none duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm',
          overlayElevation[level],
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
import type { ContextMenuContentEmits, ContextMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  ContextMenuContent,
  ContextMenuPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuContentProps & { class?: HTMLAttributes["class"], elevation?: Elevation }>(), { elevation: undefined })
const emits = defineEmits<ContextMenuContentEmits>()

// ✦ depth (v4): overlay role. Natural level is floating in layered mode; flat otherwise.
const overlayElevation = {
  sunken: '',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}
const level = useElevation(() => props.elevation, 'overlay')

const delegatedProps = reactiveOmit(props, "class", "elevation")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(
      `z-50 max-h-(--reka-context-menu-content-available-height) min-w-40 origin-(--reka-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-popover p-1.5 text-popover-foreground duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:overflow-hidden`,
        overlayElevation[level],
        props.class,
      )"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>

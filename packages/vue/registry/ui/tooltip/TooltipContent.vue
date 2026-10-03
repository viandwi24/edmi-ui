<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
  side: 'top',
  sideOffset: 6,
})
const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(
        // recipes.tooltip: solid primary, 7px radius.
        'z-50 inline-flex w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin) items-center gap-1.5 rounded-[7px] bg-primary px-2.5 py-1.5 text-[12.5px] text-balance text-primary-foreground has-data-[slot=kbd]:pr-1.5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:rounded-sm',
        props.class,
      )"
    >
      <slot />
      <TooltipArrow class="z-50 size-2 translate-y-[calc(-50%-1px)] rotate-45 rounded-[1px] bg-primary fill-primary" />
    </TooltipContent>
  </TooltipPortal>
</template>

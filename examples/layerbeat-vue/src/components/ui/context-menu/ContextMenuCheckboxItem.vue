<script setup lang="ts">
import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PhCheck } from '@phosphor-icons/vue'
import { reactiveOmit } from "@vueuse/core"
import {
  ContextMenuCheckboxItem,
  ContextMenuItemIndicator,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuCheckboxItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ContextMenuCheckboxItemEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuCheckboxItem
    data-slot="context-menu-checkbox-item"
    v-bind="forwarded"
    :class="cn(
      `relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground pl-8`,
      props.class,
    )"
  >
    <span class="pointer-events-none absolute left-1.5 flex size-4 items-center justify-center">
      <ContextMenuItemIndicator>
        <slot name="indicator-icon">
          <PhCheck />
        </slot>
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuCheckboxItem>
</template>

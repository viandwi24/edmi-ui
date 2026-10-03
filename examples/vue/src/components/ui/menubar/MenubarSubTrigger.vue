<script setup lang="ts">
import type { MenubarSubTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PhCaretRight } from '@phosphor-icons/vue'
import { reactiveOmit } from "@vueuse/core"
import { MenubarSubTrigger, useForwardProps } from "reka-ui"
import { cn } from '@/lib/utils'

const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const delegatedProps = reactiveOmit(props, "class", "inset")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn(
      `relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground`,
      props.class,
    )"
  >
    <slot />
    <PhCaretRight class="ml-auto rtl:rotate-180" />
  </MenubarSubTrigger>
</template>

<script setup lang="ts">
import type { MenubarTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { MenubarTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<MenubarTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
      `flex h-[30px] items-center rounded-[7px] px-3 text-[13.5px] font-medium outline-none select-none hover:bg-accent data-[state=open]:bg-accent`,
        props.class,
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>

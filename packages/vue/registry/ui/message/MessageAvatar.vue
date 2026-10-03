<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}
const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="message-avatar"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'mt-[5px] flex w-fit min-w-6 shrink-0 items-center justify-center self-start overflow-hidden rounded-full group-has-data-[slot=message-header]/message:mt-[3px]',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>

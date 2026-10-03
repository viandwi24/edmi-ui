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
    data-slot="message-header"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'flex h-[30px] max-w-full min-w-0 items-center gap-2 px-[13px] text-xs text-muted-foreground group-has-data-[variant=ghost]/message:px-0',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>

<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
})
</script>

<template>
  <Primitive
    data-slot="bubble-content"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'w-fit max-w-full min-w-0 overflow-hidden rounded-2xl border border-transparent px-[13px] py-[9px] text-sm leading-normal wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:outline-2 [button,a]:focus-visible:outline-offset-2 [button,a]:focus-visible:outline-ring',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>

<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BubbleReactionsVariants } from "."
import { Primitive } from "reka-ui"
import { provide } from "vue"
import { cn } from '@/lib/utils'
import { bubbleReactionsVariants } from "."

interface Props extends PrimitiveProps {
  side?: BubbleReactionsVariants["side"]
  align?: BubbleReactionsVariants["align"]
  /** ✦ one-step 3D look on every chip (chips may override) */
  raised?: boolean
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "end",
  as: "div",
  raised: false,
})

provide("bubbleReactions", {
  get raised() { return props.raised },
})
</script>

<template>
  <Primitive
    data-slot="bubble-reactions"
    :data-side="side"
    :data-align="align"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleReactionsVariants({ side, align }), props.class)"
  >
    <slot />
  </Primitive>
</template>

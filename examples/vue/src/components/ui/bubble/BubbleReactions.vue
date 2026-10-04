<script lang='ts' setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { BubbleReactionsVariants } from "."
import { Primitive } from "reka-ui"
import { computed, provide } from "vue"
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { bubbleReactionsVariants } from "."

interface Props extends PrimitiveProps {
  side?: BubbleReactionsVariants["side"]
  align?: BubbleReactionsVariants["align"]
  /** ✦ depth of the chips: raised +1 / floating +2 bevel every chip (chips may override) */
  elevation?: Elevation
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "end",
  as: "div",
  elevation: undefined,
})

const level = useElevation(() => props.elevation, "control")
const raised = computed(() => level.value === "raised" || level.value === "floating")

provide("bubbleReactions", {
  get raised() { return raised.value },
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

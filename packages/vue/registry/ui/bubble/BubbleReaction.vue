<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { inject } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { bubbleReactionVariants } from "."

/** ✦ Edmi addition: a single floating reaction chip. */
interface Props extends PrimitiveProps {
  active?: boolean
  /** ✦ overrides the BubbleReactions `raised` */
  raised?: boolean
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  as: "button",
  raised: undefined,
})

const context = inject<{ raised?: boolean } | null>("bubbleReactions", null)
</script>

<template>
  <Primitive
    data-slot="bubble-reaction"
    :data-active="active ? '' : undefined"
    :type="as === 'button' ? 'button' : undefined"
    :aria-pressed="active"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleReactionVariants({ active, raised: props.raised ?? context?.raised ?? false }), props.class)"
  >
    <slot />
  </Primitive>
</template>

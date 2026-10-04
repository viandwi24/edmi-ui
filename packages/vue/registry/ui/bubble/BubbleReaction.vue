<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { computed, inject } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { bubbleReactionVariants } from "."

/** ✦ Edmi addition: a single floating reaction chip. */
interface Props extends PrimitiveProps {
  active?: boolean
  /** ✦ overrides the BubbleReactions `elevation` for this chip */
  elevation?: Elevation
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  as: "button",
  elevation: undefined,
})

const context = inject<{ raised?: boolean } | null>("bubbleReactions", null)
const raised = computed(() =>
  props.elevation && props.elevation !== "auto"
    ? props.elevation === "raised" || props.elevation === "floating"
    : !!context?.raised,
)
</script>

<template>
  <Primitive
    data-slot="bubble-reaction"
    :data-active="active ? '' : undefined"
    :type="as === 'button' ? 'button' : undefined"
    :aria-pressed="active"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleReactionVariants({ active, elevation: raised ? 'raised' : 'flat' }), props.class)"
  >
    <slot />
  </Primitive>
</template>

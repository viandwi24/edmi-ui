<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { PanelPositionType } from "@vue-flow/core"
import type { HTMLAttributes } from "vue"
import { Panel as PanelPrimitive } from "@vue-flow/core"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"

/** Any UI pinned to a canvas corner (legend, filters, run buttons). Workflow only, not the ui inset panel. */
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  position?: PanelPositionType
}>(), {
  position: "top-right",
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <PanelPrimitive
    data-slot="ai-panel"
    v-bind="delegatedProps"
    :class="cn('m-4 overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card p-1', props.class)"
  >
    <slot />
  </PanelPrimitive>
</template>

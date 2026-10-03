<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { Position } from "@vue-flow/core"
import { NodeToolbar } from "@vue-flow/node-toolbar"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"

/** Floating actions attached to a node (solid chip: --popover + 1px border). Above the node by default. */
const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  position?: Position
  isVisible?: boolean
  offset?: number
}>(), {
  position: Position.Top,
  isVisible: undefined,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <NodeToolbar
    data-slot="ai-toolbar"
    v-bind="delegatedProps"
    :class="cn('flex items-center gap-0.5 rounded-[9px] border border-border bg-popover p-[3px]', props.class)"
  >
    <slot />
  </NodeToolbar>
</template>

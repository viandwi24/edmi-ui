<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes, VNode } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { Comment, Fragment, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Accordion } from "@/registry/edmi/ui/accordion"

// Reka needs `type`; single + collapsible matches the React port (Base UI default).
const props = withDefaults(
  defineProps<AccordionRootProps & { class?: HTMLAttributes["class"] }>(),
  { type: "single", collapsible: true },
)
const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const slots = useSlots()

// Number of AgentTool children (looks through v-for fragments); called from the template, never at setup.
function toolCount() {
  const walk = (nodes: VNode[]): number =>
    nodes.reduce((n, node) => {
      if (node.type === Fragment) {
        return n + walk(Array.isArray(node.children) ? (node.children as VNode[]) : [])
      }
      return typeof node.type === "symbol" && (node.type as symbol) === (Comment as unknown as symbol) ? n : n + 1
    }, 0)
  return walk(slots.default?.() ?? [])
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">Tools · {{ toolCount() }}</span>
    <Accordion v-bind="forwarded" :class="cn('border-t border-border-2', props.class)">
      <slot />
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes, VNode } from "vue"
import { AlertCircleIcon, CircleCheckIcon, CircleIcon, Loader2Icon } from "@lucide/vue"
import { Text, h, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** ✦ Leading status icon: pending, in-progress (spinner), completed (struck through), error. */
  status?: "pending" | "in-progress" | "completed" | "error"
}>()

const slots = useSlots()

// line-through only the text, not the file chips (decorations propagate into flex items)
function Content() {
  const nodes: VNode[] = slots.default?.() ?? []
  if (props.status !== "completed")
    return nodes
  return nodes.map(node =>
    node.type === Text && typeof node.children === "string"
      ? h("span", { class: "line-through" }, node.children)
      : node,
  )
}
</script>

<template>
  <div
    v-if="status"
    data-slot="ai-task-item"
    :data-status="status"
    :class="cn(
      'flex flex-wrap items-center gap-2 text-[13.5px] [&>svg]:size-4 [&>svg]:shrink-0',
      status === 'completed' && 'text-muted-foreground',
      status === 'pending' && 'text-muted-foreground',
      status === 'error' && 'text-destructive-text',
      props.class,
    )"
  >
    <CircleIcon v-if="status === 'pending'" class="text-muted-foreground-2" />
    <Loader2Icon v-else-if="status === 'in-progress'" class="animate-spin text-info-text" />
    <CircleCheckIcon v-else-if="status === 'completed'" class="text-success-text" />
    <AlertCircleIcon v-else class="text-destructive-text" />
    <Content />
  </div>
  <div v-else data-slot="ai-task-item" :class="cn('text-[13.5px] text-muted-foreground', props.class)">
    <slot />
  </div>
</template>

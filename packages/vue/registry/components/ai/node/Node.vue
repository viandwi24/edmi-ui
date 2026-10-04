<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Handle, Position } from "@vue-flow/core"
import { cn } from "@/registry/edmi/lib/utils"
import { Card } from "@/registry/edmi/ui/card"

interface NodeHandles {
  target?: boolean
  source?: boolean
}

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  handles?: NodeHandles
  /** Ring state. Inside Vue Flow the `selected` class on the node wrapper does the same. */
  selected?: boolean
  /** ✦ one-step 3D look. */
  raised?: boolean
}>(), {
  selected: false,
  raised: false,
})

const handleClass = "size-2.5 rounded-full border-2 border-muted-foreground bg-card"
</script>

<template>
  <Card
    data-slot="ai-node"
    :data-selected="props.selected ? '' : undefined"
    :elevation="props.raised ? 'raised' : undefined"
    :class="cn(
      'relative size-full h-auto w-60 gap-0 overflow-visible rounded-[calc(var(--radius)*1.2)] py-0',
      'data-[selected]:border-ring data-[selected]:shadow-ring [.selected_&]:border-ring [.selected_&]:shadow-ring',
      props.class,
    )"
  >
    <Handle v-if="props.handles?.target" :class="handleClass" :position="Position.Left" type="target" />
    <Handle v-if="props.handles?.source" :class="handleClass" :position="Position.Right" type="source" />
    <slot />
  </Card>
</template>

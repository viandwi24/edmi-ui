<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, Fragment, isVNode, onMounted, useSlots, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useMessageBranchContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const slots = useSlots()
const { currentBranch, setBranches } = useMessageBranchContext()

// Every direct child of the default slot is one branch (v-for children are flattened).
const branchVNodes = computed(() => {
  const flatten = (nodes: unknown[]): unknown[] =>
    nodes.flatMap(node =>
      isVNode(node) && node.type === Fragment && Array.isArray(node.children)
        ? flatten(node.children)
        : [node])
  return flatten(slots.default?.() ?? []).filter(node => isVNode(node) && typeof node.type !== "symbol")
})

const sync = () => setBranches(branchVNodes.value.length)
onMounted(sync)
watch(() => branchVNodes.value.length, sync)
</script>

<template>
  <template v-for="(node, index) in branchVNodes" :key="(node as any).key ?? index">
    <div :class="cn('grid gap-1.5 overflow-hidden [&>div]:pb-0', index === currentBranch ? 'block' : 'hidden', props.class)">
      <component :is="node as any" />
    </div>
  </template>
</template>

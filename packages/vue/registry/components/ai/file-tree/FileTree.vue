<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes, Ref } from "vue"
import { useVModel } from "@vueuse/core"
import { provide, toRef } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { FileTreeKey } from "./context"

const props = withDefaults(defineProps<{
  expanded?: Set<string>
  defaultExpanded?: Set<string>
  selectedPath?: string
  class?: HTMLAttributes["class"]
}>(), {
  expanded: undefined,
  defaultExpanded: () => new Set<string>(),
  selectedPath: undefined,
})

const emit = defineEmits<{
  (e: "select", path: string): void
  (e: "update:expanded", expanded: Set<string>): void
}>()

const expandedPaths = useVModel(props, "expanded", emit, {
  passive: true,
  defaultValue: props.defaultExpanded,
})

provide(FileTreeKey, {
  expandedPaths: expandedPaths as Ref<Set<string>>,
  togglePath: (path: string) => {
    const next = new Set(expandedPaths.value)
    if (next.has(path)) {
      next.delete(path)
    }
    else {
      next.add(path)
    }
    expandedPaths.value = next
  },
  selectedPath: toRef(props, "selectedPath"),
  select: (path: string) => emit("select", path),
})
</script>

<template>
  <div
    data-slot="ai-file-tree"
    role="tree"
    :class="cn('rounded-xl border border-border bg-card p-2 text-[13px] text-card-foreground', props.class)"
  >
    <slot />
  </div>
</template>

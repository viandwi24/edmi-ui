<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { FileCodeIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { FILE_TREE_ROW, useFileTreeContext } from "./context"
import FileTreeIcon from "./FileTreeIcon.vue"
import FileTreeName from "./FileTreeName.vue"

// Default content is a spacer, the `icon` slot (or a file icon) and the name; pass a default slot to replace all of it.
const props = defineProps<{
  path: string
  name: string
  class?: HTMLAttributes["class"]
}>()

const { selectedPath, select } = useFileTreeContext()
const isSelected = computed(() => selectedPath.value === props.path)
</script>

<template>
  <div
    role="treeitem"
    tabindex="0"
    :aria-selected="isSelected"
    :data-selected="isSelected ? '' : undefined"
    :class="cn(FILE_TREE_ROW, 'cursor-pointer', props.class)"
    @click="select(props.path)"
    @keydown.enter="select(props.path)"
    @keydown.space.prevent="select(props.path)"
  >
    <slot>
      <!-- Spacer so files line up with folder names -->
      <span class="w-3.5 shrink-0" />
      <FileTreeIcon>
        <slot name="icon">
          <FileCodeIcon class="size-4" />
        </slot>
      </FileTreeIcon>
      <FileTreeName>{{ props.name }}</FileTreeName>
    </slot>
  </div>
</template>

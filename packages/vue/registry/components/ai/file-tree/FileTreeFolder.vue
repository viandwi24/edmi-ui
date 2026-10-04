<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronRightIcon, FolderIcon, FolderOpenIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { FILE_TREE_ROW, useFileTreeContext } from "./context"
import FileTreeIcon from "./FileTreeIcon.vue"
import FileTreeName from "./FileTreeName.vue"

const props = defineProps<{
  path: string
  name: string
  class?: HTMLAttributes["class"]
}>()

const { expandedPaths, togglePath, selectedPath, select } = useFileTreeContext()

const isExpanded = computed(() => expandedPaths.value.has(props.path))
const isSelected = computed(() => selectedPath.value === props.path)
</script>

<template>
  <Collapsible :open="isExpanded" @update:open="togglePath(props.path)">
    <div role="treeitem" :aria-expanded="isExpanded" tabindex="-1" :class="props.class">
      <div :class="FILE_TREE_ROW" :data-selected="isSelected ? '' : undefined">
        <CollapsibleTrigger
          :aria-label="isExpanded ? `Collapse ${props.name}` : `Expand ${props.name}`"
          class="flex shrink-0 cursor-pointer items-center border-none bg-transparent p-0 text-muted-foreground"
        >
          <ChevronRightIcon :class="cn('size-3.5 transition-transform', isExpanded && 'rotate-90')" />
        </CollapsibleTrigger>
        <button
          class="flex min-w-0 flex-1 cursor-pointer items-center gap-[7px] border-none bg-transparent p-0 text-left"
          type="button"
          @click="select(props.path)"
        >
          <FileTreeIcon class="text-chart-3">
            <FolderOpenIcon v-if="isExpanded" class="size-4" />
            <FolderIcon v-else class="size-4" />
          </FileTreeIcon>
          <FileTreeName>{{ props.name }}</FileTreeName>
        </button>
      </div>
      <CollapsibleContent>
        <div class="pl-4">
          <slot />
        </div>
      </CollapsibleContent>
    </div>
  </Collapsible>
</template>

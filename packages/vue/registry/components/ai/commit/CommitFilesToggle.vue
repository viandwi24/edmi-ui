<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

// ✦ The "N files changed" row that opens and closes the file list (sits under the header, own top border).
const props = defineProps<{
  /** Number of files; renders "N files changed" when the slot is empty. */
  count?: number
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div class="border-t border-border-2 px-4 pt-2 pb-1.5">
    <CollapsibleTrigger
      as="button"
      :class="cn(
        'group/commit-toggle flex w-full cursor-pointer items-center gap-2 py-1 text-left text-[13.5px] text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        props.class,
      )"
    >
      <ChevronDownIcon class="size-3.5 transition-transform group-data-[state=open]/commit-toggle:rotate-180" />
      <span>
        <slot>{{ props.count ?? 0 }} file{{ props.count === 1 ? "" : "s" }} changed</slot>
      </span>
    </CollapsibleTrigger>
  </div>
</template>

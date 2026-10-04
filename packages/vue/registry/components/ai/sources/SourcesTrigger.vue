<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { BookmarkIcon, ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  count: number
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-sources-trigger"
    :class="cn(
      'group/sources-trigger flex w-full items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <slot>
      <BookmarkIcon class="size-4" />
      <span>Used {{ count }} {{ count === 1 ? "source" : "sources" }}</span>
      <ChevronDownIcon
        class="ml-auto size-4 transition-transform group-data-[state=open]/sources-trigger:rotate-180"
      />
    </slot>
  </CollapsibleTrigger>
</template>

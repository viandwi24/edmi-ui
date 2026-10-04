<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/edmi/ui/scroll-area"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Row of suggestions; scrolls horizontally. -->
  <ScrollArea data-slot="ai-suggestions" class="w-full overflow-x-auto whitespace-nowrap">
    <div :class="cn('flex w-max flex-nowrap items-center gap-2', props.class)">
      <slot />
    </div>
    <ScrollBar class="hidden" orientation="horizontal" />
  </ScrollArea>
</template>

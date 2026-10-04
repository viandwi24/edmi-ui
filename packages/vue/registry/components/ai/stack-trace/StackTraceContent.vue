<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"

const props = withDefaults(defineProps<{
  maxHeight?: number
  class?: HTMLAttributes["class"]
}>(), {
  maxHeight: 400,
})
</script>

<template>
  <CollapsibleContent
    data-slot="ai-stack-trace-content"
    :class="cn('overflow-auto border-t border-border', props.class)"
    :style="{ maxHeight: `${props.maxHeight}px` }"
  >
    <slot />
  </CollapsibleContent>
</template>

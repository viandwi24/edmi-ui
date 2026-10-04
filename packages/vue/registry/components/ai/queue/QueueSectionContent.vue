<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleContent
    data-slot="ai-queue-section-content"
    :class="cn(
      'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class,
    )"
  >
    <slot />
  </CollapsibleContent>
</template>

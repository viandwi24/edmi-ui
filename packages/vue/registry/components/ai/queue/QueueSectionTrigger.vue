<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-queue-section-trigger"
    :class="cn(
      'group/queue-trigger flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-semibold text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <slot />
  </CollapsibleTrigger>
</template>

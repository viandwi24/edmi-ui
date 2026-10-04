<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardContent } from "@/registry/edmi/ui/card"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleContent class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
    <CardContent
      data-slot="ai-plan-content"
      :class="cn('pb-3.5 text-[13.5px] leading-[1.7] text-foreground-2', props.class)"
    >
      <slot />
    </CardContent>
  </CollapsibleContent>
</template>

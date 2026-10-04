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
    data-slot="ai-sources-content"
    :class="cn(
      'overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class,
    )"
  >
    <div class="flex flex-col gap-1.5 pt-2 pl-[23px]">
      <slot />
    </div>
  </CollapsibleContent>
</template>

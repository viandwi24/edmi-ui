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
    data-slot="ai-tool-content"
    :class="cn(
      'overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class,
    )"
  >
    <div class="space-y-3 border-t border-border px-3.5 py-3 text-[13px]">
      <slot />
    </div>
  </CollapsibleContent>
</template>

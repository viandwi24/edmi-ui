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
    data-slot="ai-sandbox-content"
    :class="cn('overflow-hidden border-t border-border outline-none', props.class)"
  >
    <slot />
  </CollapsibleContent>
</template>

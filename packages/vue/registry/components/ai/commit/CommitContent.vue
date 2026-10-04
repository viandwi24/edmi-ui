<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleContent } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <CollapsibleContent :class="cn('px-4 pb-3', props.class)">
    <slot />
  </CollapsibleContent>
</template>

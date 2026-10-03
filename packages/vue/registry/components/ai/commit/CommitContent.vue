<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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

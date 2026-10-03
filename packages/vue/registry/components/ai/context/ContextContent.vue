<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { HoverCardContent } from "@/registry/edmi/ui/hover-card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <HoverCardContent :class="cn('min-w-60 divide-y divide-border overflow-hidden p-0', props.class)">
    <slot />
  </HoverCardContent>
</template>

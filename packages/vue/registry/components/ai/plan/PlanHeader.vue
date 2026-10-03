<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardHeader } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardHeader data-slot="ai-plan-header" :class="cn('flex items-start justify-between gap-2.5 py-3.5', props.class)">
    <slot />
  </CardHeader>
</template>

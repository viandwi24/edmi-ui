<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardContent } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardContent data-slot="ai-node-content" :class="cn('px-3 py-2.5 text-[12.5px]', props.class)">
    <slot />
  </CardContent>
</template>

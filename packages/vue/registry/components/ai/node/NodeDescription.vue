<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardDescription } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardDescription data-slot="ai-node-description" :class="cn('text-xs', props.class)">
    <slot />
  </CardDescription>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardTitle } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardTitle data-slot="ai-node-title" :class="cn('text-[13.5px] font-semibold', props.class)">
    <slot />
  </CardTitle>
</template>

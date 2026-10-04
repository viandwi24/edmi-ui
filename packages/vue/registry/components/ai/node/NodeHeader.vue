<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CardHeader } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardHeader
    data-slot="ai-node-header"
    :class="cn('gap-0.5 rounded-t-[inherit] border-b border-border-2 px-3 py-2.5 [.border-b]:pb-2.5', props.class)"
  >
    <slot />
  </CardHeader>
</template>

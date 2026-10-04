<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = withDefaults(defineProps<{
  label: string
  count?: number
  /** ✦ Show the collapse chevron (default true). */
  chevron?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  chevron: true,
})
</script>

<template>
  <span data-slot="ai-queue-section-label" :class="cn('flex items-center gap-2', props.class)">
    <ChevronDownIcon
      v-if="props.chevron"
      class="size-4 text-muted-foreground transition-transform group-data-[state=open]/queue-trigger:rotate-180"
    />
    <slot name="icon" />
    <span>{{ label }}</span>
    <Badge v-if="count !== undefined" shape="number" variant="secondary" class="h-5">{{ count }}</Badge>
  </span>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-inline-citation-header"
    :class="cn('flex items-center gap-0.5 border-b border-border px-2.5 py-2', props.class)"
  >
    <slot />
  </div>
</template>

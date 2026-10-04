<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-test-results-header"
    :class="cn('flex items-center justify-between gap-2.5 px-4 py-3.5', props.class)"
  >
    <slot />
  </div>
</template>

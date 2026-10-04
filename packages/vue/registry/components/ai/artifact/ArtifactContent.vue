<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// Scrollable content. No padding by default (code blocks and images run edge to edge); add `p-4` for prose.
const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-artifact-content" :class="cn('flex-1 overflow-auto', props.class)">
    <slot />
  </div>
</template>

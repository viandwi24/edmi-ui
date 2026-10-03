<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-test-results-content"
    :class="cn('space-y-1 border-t border-border-2 px-4 pt-1.5 pb-3', props.class)"
  >
    <slot />
  </div>
</template>

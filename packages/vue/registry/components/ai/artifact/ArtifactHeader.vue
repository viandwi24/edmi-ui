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
    data-slot="ai-artifact-header"
    :class="cn('flex items-center justify-between gap-2.5 border-b border-border px-3.5 py-3', props.class)"
  >
    <slot />
  </div>
</template>

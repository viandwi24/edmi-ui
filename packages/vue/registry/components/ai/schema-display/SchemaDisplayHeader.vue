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
    data-slot="ai-schema-display-header"
    :class="cn('flex items-center gap-2.5 px-4 py-3.5', props.class)"
  >
    <slot />
  </div>
</template>

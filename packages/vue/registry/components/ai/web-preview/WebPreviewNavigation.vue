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
    data-slot="ai-web-preview-navigation"
    :class="cn('flex h-11 shrink-0 items-center gap-1 border-b border-border px-2', props.class)"
  >
    <slot />
  </div>
</template>

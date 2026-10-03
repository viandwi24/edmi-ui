<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Large preview of the main output (render the document, slide or image inside). -->
  <div
    data-slot="ai-session-output-preview"
    :class="cn('h-[150px] overflow-hidden rounded-[var(--radius)] border border-border bg-muted', props.class)"
  >
    <slot />
  </div>
</template>

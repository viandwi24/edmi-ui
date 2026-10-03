<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Scroll area on --muted; documents sit on it as paper. -->
  <div data-slot="ai-artifact-viewer-content" :class="cn('min-h-0 flex-1 overflow-auto bg-muted p-4', props.class)">
    <slot />
  </div>
</template>

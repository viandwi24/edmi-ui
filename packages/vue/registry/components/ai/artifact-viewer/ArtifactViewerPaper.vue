<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- A white page, in light and dark mode alike (DESIGN 5b rule 5). -->
  <div
    data-slot="ai-artifact-viewer-paper"
    :class="cn('w-full rounded-[calc(var(--radius)*0.6)] border border-border bg-white px-10 py-[34px] text-[#1f1f1d]', props.class)"
  >
    <slot />
  </div>
</template>

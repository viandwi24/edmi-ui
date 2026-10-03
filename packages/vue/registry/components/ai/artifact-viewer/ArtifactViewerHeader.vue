<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-artifact-viewer-header"
    :class="cn('flex h-[46px] shrink-0 items-center gap-1 border-b border-border pr-2 pl-4', props.class)"
  >
    <slot />
  </div>
</template>

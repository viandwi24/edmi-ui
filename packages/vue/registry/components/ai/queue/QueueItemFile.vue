<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PaperclipIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="ai-queue-item-file"
    :class="cn('flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs', props.class)"
  >
    <PaperclipIcon class="size-3" />
    <span class="max-w-[100px] truncate"><slot /></span>
  </span>
</template>

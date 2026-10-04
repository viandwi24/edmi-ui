<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// Hash chip: mono, outline. Put `CommitCopyButton` inside it for the board's chip with a copy icon.
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span :class="cn('inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border border-input px-2 font-mono text-xs text-foreground', props.class)">
    <slot />
  </span>
</template>

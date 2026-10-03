<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { TerminalSquareIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-terminal-title" :class="cn('flex items-center gap-2', props.class)">
    <TerminalSquareIcon class="size-3.5" />
    <slot>Terminal</slot>
  </div>
</template>

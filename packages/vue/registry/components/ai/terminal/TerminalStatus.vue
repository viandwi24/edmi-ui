<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTerminalContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isStreaming } = useTerminalContext("TerminalStatus")
</script>

<template>
  <div
    v-if="isStreaming"
    data-slot="ai-terminal-status"
    :class="cn('ml-1.5 flex items-center gap-1.5', props.class)"
  >
    <slot>
      <span class="size-1.5 rounded-full bg-[oklch(0.78_0.15_155)]" />
      running
    </slot>
  </div>
</template>

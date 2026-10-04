<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Terminal } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div data-slot="ai-terminal-title" :class="cn('flex items-center gap-2', props.class)">
    <Terminal class="size-3.5" />
    <slot>Terminal</slot>
  </div>
</template>

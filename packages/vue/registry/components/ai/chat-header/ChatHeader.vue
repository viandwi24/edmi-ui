<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Thread bar: title, project indicator and actions. -->
  <header
    data-slot="ai-chat-header"
    :class="cn('flex h-[52px] w-full items-center justify-between gap-3 rounded-[calc(var(--radius)*1.2)] border border-border bg-background pr-2.5 pl-4', props.class)"
  >
    <slot />
  </header>
</template>

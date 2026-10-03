<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { ScrollArea } from "@/registry/edmi/ui/scroll-area"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <ScrollArea data-slot="ai-queue-list" :class="cn('mt-0.5', props.class)">
    <div class="max-h-48">
      <ul>
        <slot />
      </ul>
    </div>
  </ScrollArea>
</template>

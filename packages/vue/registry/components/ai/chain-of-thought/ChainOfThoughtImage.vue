<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  caption?: string
}>()
</script>

<template>
  <div data-slot="ai-chain-of-thought-image" :class="cn('w-fit max-w-full space-y-1', props.class)">
    <div class="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-[10px] border border-border bg-muted">
      <slot />
    </div>
    <p v-if="caption" class="text-xs text-muted-foreground">
      {{ caption }}
    </p>
  </div>
</template>

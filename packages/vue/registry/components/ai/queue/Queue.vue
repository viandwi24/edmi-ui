<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = withDefaults(defineProps<{
  /** ✦ `card` (default) or `flat` (no border, fill or padding). */
  variant?: "card" | "flat"
  class?: HTMLAttributes["class"]
}>(), {
  variant: "card",
})
</script>

<template>
  <div
    data-slot="ai-queue"
    :data-variant="props.variant"
    :class="cn('not-prose flex flex-col', props.variant === 'card' && 'rounded-xl border border-border bg-card p-2', props.class)"
  >
    <slot />
  </div>
</template>

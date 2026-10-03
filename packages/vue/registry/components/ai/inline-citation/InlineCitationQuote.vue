<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <blockquote
    data-slot="ai-inline-citation-quote"
    :class="cn('mt-2.5 border-l-2 border-border pl-2.5 text-[12.5px] text-foreground-2', props.class)"
  >
    <slot />
  </blockquote>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { BookmarkIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span data-slot="ai-checkpoint-icon" :class="cn('inline-flex shrink-0 [&_svg]:size-4', props.class)">
    <slot><BookmarkIcon /></slot>
  </span>
</template>

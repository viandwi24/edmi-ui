<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex min-w-0 items-center gap-1', props.class)">
    <slot />
  </div>
</template>

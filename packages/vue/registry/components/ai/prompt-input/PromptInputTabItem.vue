<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Overlapping logos, each on a solid --card disc with a 1px --border ring. -->
  <div
    :class="cn(
      'flex shrink-0 items-center -space-x-1 [&>img]:rounded-full [&>img]:border [&>img]:border-border [&>img]:bg-card [&>img]:p-px',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

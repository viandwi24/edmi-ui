<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-test-error"
    :class="cn(
      'mt-1 mb-1.5 ml-[22px] basis-full rounded-md bg-destructive-soft px-3 py-2.5 font-mono text-xs leading-[1.6] text-destructive-text',
      props.class,
    )"
  >
    <slot />
  </div>
</template>

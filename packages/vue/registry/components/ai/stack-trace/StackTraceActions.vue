<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Stops clicks and Enter/Space here so the actions do not toggle the header. -->
  <div
    data-slot="ai-stack-trace-actions"
    role="group"
    :class="cn('flex shrink-0 items-center gap-0.5', props.class)"
    @click.stop
    @keydown.enter.stop
    @keydown.space.stop
  >
    <slot />
  </div>
</template>

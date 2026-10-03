<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// ✦ Row for the name followed by the attributes.
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="ai-voice-selector-header"
    :class="cn('flex items-center gap-1.5', props.class)"
  >
    <slot />
  </div>
</template>

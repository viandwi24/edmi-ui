<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <pre
    data-slot="ai-schema-display-example"
    :class="cn('mx-4 mb-3.5 overflow-auto rounded-md bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6]', props.class)"
  ><slot /></pre>
</template>

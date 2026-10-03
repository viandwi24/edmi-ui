<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTestContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const context = useTestContext()
</script>

<template>
  <span
    v-if="context.duration !== undefined"
    :class="cn('ml-auto font-mono text-xs text-muted-foreground', props.class)"
  >
    <slot>{{ context.duration }}ms</slot>
  </span>
</template>

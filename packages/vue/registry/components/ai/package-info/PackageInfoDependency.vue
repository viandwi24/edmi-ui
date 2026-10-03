<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  name: string
  version?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex items-center justify-between text-sm', props.class)">
    <slot>
      <span class="font-mono text-[12.5px] text-muted-foreground">{{ props.name }}</span>
      <span v-if="props.version" class="font-mono text-xs">{{ props.version }}</span>
    </slot>
  </div>
</template>

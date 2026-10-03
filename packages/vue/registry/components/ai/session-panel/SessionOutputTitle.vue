<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Small line under the title (`Artifact`). */
  meta?: string
}>()
</script>

<template>
  <div data-slot="ai-session-output-title" :class="cn('mt-2', props.class)">
    <div class="text-sm">
      <slot />
    </div>
    <div v-if="meta" class="font-mono text-[12.5px] text-muted-foreground">
      {{ meta }}
    </div>
  </div>
</template>

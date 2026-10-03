<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { SparklesIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{
  name: string
  model?: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-agent-header"
    :class="cn('flex w-full items-center gap-2.5 border-b border-border px-4 py-3.5', props.class)"
  >
    <span class="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-text">
      <SparklesIcon class="size-4" />
    </span>
    <span class="text-sm font-semibold">{{ props.name }}</span>
    <Badge v-if="props.model" class="h-5 font-mono text-[11px]" variant="secondary">
      {{ props.model }}
    </Badge>
  </div>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{
  name: string
  type: string
  required?: boolean
  description?: string
  location?: "path" | "query" | "header"
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="ai-schema-display-parameter"
    :class="cn('flex items-center gap-2 py-1.5 text-[12.5px]', props.class)"
  >
    <span class="font-mono font-medium">{{ props.name }}</span>
    <span class="font-mono text-muted-foreground">{{ props.type }}</span>
    <Badge v-if="props.location" class="h-[18px] text-[10.5px]" variant="secondary">
      {{ props.location }}
    </Badge>
    <Badge v-if="props.required" class="h-[18px] text-[10.5px]" variant="warning">
      required
    </Badge>
    <span v-if="props.description" class="ml-auto text-right text-xs text-muted-foreground">{{ props.description }}</span>
  </div>
</template>

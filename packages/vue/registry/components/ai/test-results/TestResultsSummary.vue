<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"
import { useTestResultsContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const context = useTestResultsContext()
</script>

<template>
  <div v-if="context.summary" :class="cn('flex items-center gap-2.5', props.class)">
    <slot>
      <span class="font-semibold">Tests</span>
      <Badge class="h-5" variant="success">
        {{ context.summary.passed }} passed
      </Badge>
      <Badge v-if="context.summary.failed > 0" class="h-5" variant="destructive">
        {{ context.summary.failed }} failed
      </Badge>
      <Badge v-if="context.summary.skipped > 0" class="h-5" variant="warning">
        {{ context.summary.skipped }} skipped
      </Badge>
    </slot>
  </div>
</template>

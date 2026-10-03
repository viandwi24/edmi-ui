<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useStackTraceContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isOpen } = useStackTraceContext("StackTraceExpandButton")
</script>

<template>
  <div
    data-slot="ai-stack-trace-expand"
    :class="cn('flex size-6 items-center justify-center', props.class)"
  >
    <ChevronDownIcon
      :class="cn('size-3.5 text-muted-foreground transition-transform', isOpen ? 'rotate-180' : 'rotate-0')"
    />
  </div>
</template>

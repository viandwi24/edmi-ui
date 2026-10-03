<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { DynamicToolUIPart, ToolUIPart } from "ai"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

type ToolPart = ToolUIPart | DynamicToolUIPart

const props = defineProps<{
  input: ToolPart["input"]
  class?: HTMLAttributes["class"]
}>()

const formatted = computed(() => JSON.stringify(props.input, null, 2))
</script>

<template>
  <div data-slot="ai-tool-input" :class="cn('overflow-hidden', props.class)">
    <div class="mb-1.5 font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">
      Parameters
    </div>
    <pre class="m-0 overflow-x-auto rounded-lg bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6] whitespace-pre text-foreground">{{ formatted }}</pre>
  </div>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { DynamicToolUIPart, ToolUIPart } from "ai"
import type { HTMLAttributes } from "vue"
import { computed, isVNode } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

type ToolPart = ToolUIPart | DynamicToolUIPart

const props = defineProps<{
  output: ToolPart["output"]
  errorText: ToolPart["errorText"]
  class?: HTMLAttributes["class"]
}>()

const show = computed(() => Boolean(props.output || props.errorText))
const isNode = computed(() => isVNode(props.output))
const text = computed(() => {
  if (typeof props.output === "string")
    return props.output
  return JSON.stringify(props.output, null, 2)
})

const pre = "m-0 overflow-x-auto rounded-lg bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6] whitespace-pre text-foreground"
</script>

<template>
  <div v-if="show" data-slot="ai-tool-output" :class="props.class">
    <div class="mb-1.5 font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">
      {{ props.errorText ? "Error" : "Result" }}
    </div>
    <pre v-if="props.errorText" :class="cn(pre, 'bg-destructive-soft text-destructive-text')">{{ props.errorText }}</pre>
    <div v-else-if="isNode" class="overflow-x-auto">
      <component :is="() => props.output" />
    </div>
    <pre v-else :class="pre">{{ text }}</pre>
  </div>
</template>

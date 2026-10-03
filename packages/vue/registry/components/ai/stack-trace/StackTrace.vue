<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { ParsedStackTrace } from "./context"
import { useVModel } from "@vueuse/core"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import { StackTraceKey } from "./context"
import { parseStackTrace } from "./utils"

const props = withDefaults(defineProps<{
  trace: string
  modelValue?: boolean
  defaultOpen?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "openChange", value: boolean): void
  (e: "filePathClick", filePath: string, line?: number, column?: number): void
}>()

const isOpen = useVModel(props, "modelValue", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const parsedTrace = computed<ParsedStackTrace>(() => parseStackTrace(props.trace))

function onFilePathClick(filePath: string, line?: number, column?: number) {
  emit("filePathClick", filePath, line, column)
}

function setIsOpen(value: boolean) {
  isOpen.value = value
  emit("openChange", value)
}

provide(StackTraceKey, {
  trace: parsedTrace,
  raw: computed(() => props.trace),
  isOpen,
  setIsOpen,
  onFilePathClick,
})
</script>

<template>
  <Collapsible
    data-slot="ai-stack-trace"
    :open="isOpen"
    :class="cn(
      'not-prose w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card font-mono text-sm',
      props.class,
    )"
    @update:open="setIsOpen"
  >
    <slot />
  </Collapsible>
</template>

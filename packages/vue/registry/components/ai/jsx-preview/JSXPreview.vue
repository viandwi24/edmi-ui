<script setup lang="ts">
// Edmi ✦ port: AI Elements has no Vue JSX Preview. Markup is parsed by ./parser (no eval), rendered with `components`.
import type { Component, HTMLAttributes } from "vue"
import type { JsxNode } from "./parser"
import { computed, provide, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { JSXPreviewKey } from "./context"
import { findUnknownComponent, parseJsx } from "./parser"

const props = withDefaults(defineProps<{
  /** Markup to render: JSX-like tags, quoted or `{braced}` attributes, `{binding}` text. */
  jsx: string
  isStreaming?: boolean
  components?: Record<string, Component | string>
  bindings?: Record<string, unknown>
  class?: HTMLAttributes["class"]
}>(), {
  isStreaming: false,
})

const emit = defineEmits<{
  (e: "error", error: Error): void
}>()

const lastGood = ref<JsxNode[]>([])
const error = ref<Error | null>(null)

const parsed = computed(() => {
  try {
    const nodes = parseJsx(props.jsx, { streaming: props.isStreaming })
    const unknown = findUnknownComponent(nodes, props.components)
    if (unknown)
      throw unknown
    return { nodes, error: null as Error | null }
  }
  catch (e) {
    return { nodes: null, error: e instanceof Error ? e : new Error(String(e)) }
  }
})

watch(parsed, (result) => {
  if (result.nodes) {
    lastGood.value = result.nodes
    error.value = null
    return
  }
  // While streaming, a chunk that does not parse yet keeps the last good render and stays silent.
  if (props.isStreaming)
    return
  error.value = result.error
  if (result.error)
    emit("error", result.error)
}, { immediate: true })

provide(JSXPreviewKey, {
  nodes: computed(() => parsed.value.nodes ?? lastGood.value),
  error,
  isStreaming: computed(() => props.isStreaming),
  components: computed(() => props.components),
  bindings: computed(() => props.bindings),
})
</script>

<template>
  <div data-slot="ai-jsx-preview" :class="cn('relative', props.class)">
    <slot />
  </div>
</template>

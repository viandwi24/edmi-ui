<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes, Ref } from "vue"
import { useVModel } from "@vueuse/core"
import { computed, onBeforeUnmount, provide, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import { ReasoningKey } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  /** Seconds. Measured automatically when `isStreaming` flips to false. */
  duration?: number
}>(), {
  isStreaming: false,
  open: undefined,
  defaultOpen: undefined,
  duration: undefined,
})

const emit = defineEmits<{
  (e: "update:open", value: boolean): void
  (e: "update:duration", value: number): void
}>()

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

const isOpen = useVModel(props, "open", emit, {
  defaultValue: props.defaultOpen ?? props.isStreaming,
  passive: true,
}) as Ref<boolean>

const internalDuration = ref<number | undefined>(props.duration)
watch(() => props.duration, (value) => {
  internalDuration.value = value
})

const hasEverStreamed = ref(props.isStreaming)
const hasAutoClosed = ref(false)
let startTime: number | null = null

// Track when streaming starts and compute the duration when it ends; auto-open on start unless
// `defaultOpen` was explicitly false.
watch(() => props.isStreaming, (streaming) => {
  if (streaming) {
    hasEverStreamed.value = true
    if (!isOpen.value && props.defaultOpen !== false)
      isOpen.value = true
    if (startTime === null)
      startTime = Date.now()
  }
  else if (startTime !== null) {
    const seconds = Math.ceil((Date.now() - startTime) / MS_IN_S)
    internalDuration.value = seconds
    emit("update:duration", seconds)
    startTime = null
  }
}, { immediate: true })

// Auto-close once when streaming ends (only if it ever streamed).
let timer: ReturnType<typeof setTimeout> | undefined
watch([() => props.isStreaming, isOpen, hasAutoClosed], () => {
  clearTimeout(timer)
  if (hasEverStreamed.value && !props.isStreaming && isOpen.value && !hasAutoClosed.value) {
    timer = setTimeout(() => {
      isOpen.value = false
      hasAutoClosed.value = true
    }, AUTO_CLOSE_DELAY)
  }
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))

provide(ReasoningKey, {
  isStreaming: computed(() => props.isStreaming),
  isOpen,
  setIsOpen: (value: boolean) => {
    isOpen.value = value
  },
  duration: computed(() => internalDuration.value),
})
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    data-slot="ai-reasoning"
    :class="cn('not-prose', props.class)"
  >
    <slot />
  </Collapsible>
</template>

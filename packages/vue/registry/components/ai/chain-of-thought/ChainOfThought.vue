<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes, Ref } from "vue"
import { useVModel } from "@vueuse/core"
import { provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { ChainOfThoughtKey } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  open?: boolean
  defaultOpen?: boolean
}>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<{
  (e: "update:open", value: boolean): void
}>()

const isOpen = useVModel(props, "open", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
}) as Ref<boolean>

provide(ChainOfThoughtKey, {
  isOpen,
  setIsOpen: (value: boolean) => {
    isOpen.value = value
  },
})
</script>

<template>
  <div data-slot="ai-chain-of-thought" :class="cn('not-prose w-full space-y-3', props.class)">
    <slot />
  </div>
</template>

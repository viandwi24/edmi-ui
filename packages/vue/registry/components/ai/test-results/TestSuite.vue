<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { TestStatusType } from "./context"
import { useVModel } from "@vueuse/core"
import { computed, provide, reactive } from "vue"
import { Collapsible } from "@/registry/edmi/ui/collapsible"
import { TestSuiteContextKey } from "./context"

const props = withDefaults(defineProps<{
  name: string
  status: TestStatusType
  defaultOpen?: boolean
  modelValue?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const isOpen = useVModel(props, "modelValue", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const context = reactive({
  name: computed(() => props.name),
  status: computed(() => props.status),
})

provide(TestSuiteContextKey, context)
</script>

<template>
  <Collapsible v-model:open="isOpen" data-slot="ai-test-suite" :class="props.class">
    <slot />
  </Collapsible>
</template>

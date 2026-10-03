<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { EnvironmentVariablesKey } from "./context"

const props = withDefaults(defineProps<{
  showValues?: boolean
  defaultShowValues?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  showValues: undefined,
  defaultShowValues: false,
})

const emit = defineEmits<{
  (e: "update:showValues", show: boolean): void
}>()

const showValues = useVModel(props, "showValues", emit, {
  passive: true,
  defaultValue: props.defaultShowValues,
})

provide(EnvironmentVariablesKey, {
  showValues,
  setShowValues: (show: boolean) => {
    showValues.value = show
  },
})
</script>

<template>
  <div
    data-slot="ai-environment-variables"
    :class="cn('overflow-hidden rounded-xl border border-border bg-card text-card-foreground', props.class)"
  >
    <slot />
  </div>
</template>

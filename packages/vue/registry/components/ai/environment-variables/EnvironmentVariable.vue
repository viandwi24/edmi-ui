<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { EnvironmentVariableKey } from "./context"
import EnvironmentVariableName from "./EnvironmentVariableName.vue"
import EnvironmentVariableValue from "./EnvironmentVariableValue.vue"

const props = defineProps<{
  name: string
  value: string
  class?: HTMLAttributes["class"]
}>()

provide(EnvironmentVariableKey, {
  name: computed(() => props.name),
  value: computed(() => props.value),
})
</script>

<template>
  <div
    data-slot="ai-environment-variable"
    :class="cn('col-span-full grid grid-cols-subgrid items-center border-t border-border-2 px-3.5 py-[9px]', props.class)"
  >
    <slot>
      <EnvironmentVariableName />
      <EnvironmentVariableValue />
    </slot>
  </div>
</template>

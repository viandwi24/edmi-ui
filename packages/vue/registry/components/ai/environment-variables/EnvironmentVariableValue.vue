<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useEnvironmentVariableContext, useEnvironmentVariablesContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { value } = useEnvironmentVariableContext()
const { showValues } = useEnvironmentVariablesContext()

// Masked values use a fixed length so the real length never leaks.
const displayValue = computed(() => (showValues.value ? value.value : "•".repeat(12)))
</script>

<template>
  <span
    :class="cn(
      'min-w-0 flex-1 truncate font-mono text-[12.5px]',
      !showValues && 'tracking-[2px] text-muted-foreground select-none',
      props.class,
    )"
  >
    <slot>{{ displayValue }}</slot>
  </span>
</template>

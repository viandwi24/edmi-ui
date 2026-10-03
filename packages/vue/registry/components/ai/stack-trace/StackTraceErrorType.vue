<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useStackTraceContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { trace } = useStackTraceContext("StackTraceErrorType")
</script>

<template>
  <span :class="cn('block font-mono text-[12.5px] font-semibold text-destructive-text', props.class)">
    <slot>{{ trace.errorType }}</slot>
  </span>
</template>

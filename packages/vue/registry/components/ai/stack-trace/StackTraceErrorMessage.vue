<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useStackTraceContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { trace } = useStackTraceContext("StackTraceErrorMessage")
</script>

<template>
  <span :class="cn('mt-0.5 block font-sans text-[13px] break-words text-foreground', props.class)">
    <slot>{{ trace.errorMessage }}</slot>
  </span>
</template>

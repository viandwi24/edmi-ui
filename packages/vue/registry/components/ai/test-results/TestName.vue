<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useTestContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { name } = useTestContext()
</script>

<template>
  <span :class="cn('flex-1', props.class)">
    <slot>{{ name }}</slot>
  </span>
</template>

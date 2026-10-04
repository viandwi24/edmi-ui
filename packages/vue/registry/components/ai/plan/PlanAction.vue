<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CardAction } from "@/registry/edmi/ui/card"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CardAction data-slot="ai-plan-action" :class="props.class">
    <slot />
  </CardAction>
</template>

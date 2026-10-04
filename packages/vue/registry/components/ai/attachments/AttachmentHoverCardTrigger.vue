<script setup lang="ts">
import type { HoverCardTriggerProps } from "reka-ui"
import { HoverCardTrigger } from "@/registry/edmi/ui/hover-card"

const props = defineProps<HoverCardTriggerProps>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>

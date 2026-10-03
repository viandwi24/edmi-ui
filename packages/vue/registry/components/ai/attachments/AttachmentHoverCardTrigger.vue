<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HoverCardTriggerProps } from "reka-ui"
import { HoverCardTrigger } from "@/registry/edmi/ui/hover-card"

const props = defineProps<HoverCardTriggerProps>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>

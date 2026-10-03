<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { HoverCardTrigger } from "@/registry/edmi/ui/hover-card"

type Props = InstanceType<typeof HoverCardTrigger>["$props"]
interface PromptInputHoverCardTriggerProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputHoverCardTriggerProps>()
</script>

<template>
  <HoverCardTrigger>
    <slot />
  </HoverCardTrigger>
</template>

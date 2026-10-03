<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { HoverCardContent } from "@/registry/edmi/ui/hover-card"

type Props = InstanceType<typeof HoverCardContent>["$props"]
interface PromptInputHoverCardContentProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputHoverCardContentProps>()
</script>

<template>
  <HoverCardContent align="start">
    <slot />
  </HoverCardContent>
</template>

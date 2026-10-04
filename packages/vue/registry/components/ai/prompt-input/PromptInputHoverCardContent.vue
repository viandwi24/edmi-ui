<script setup lang="ts">
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

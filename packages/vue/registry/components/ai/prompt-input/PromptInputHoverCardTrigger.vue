<script setup lang="ts">
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

<script setup lang="ts">
import { HoverCard } from "@/registry/edmi/ui/hover-card"

type Props = InstanceType<typeof HoverCard>["$props"]
interface PromptInputHoverCardProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputHoverCardProps>()
</script>

<template>
  <HoverCard :open-delay="0" :close-delay="0">
    <slot />
  </HoverCard>
</template>

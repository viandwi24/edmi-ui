<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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

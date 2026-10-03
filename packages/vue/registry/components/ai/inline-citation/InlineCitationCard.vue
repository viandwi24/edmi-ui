<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HoverCardRootProps } from "reka-ui"
import { HoverCard } from "@/registry/edmi/ui/hover-card"

interface InlineCitationCardProps extends /* @vue-ignore */ HoverCardRootProps {}

defineProps<InlineCitationCardProps>()
</script>

<template>
  <!-- HoverCard props (open, delays) fall through as attrs and win over the 0 defaults. -->
  <HoverCard :open-delay="0" :close-delay="0">
    <slot />
  </HoverCard>
</template>

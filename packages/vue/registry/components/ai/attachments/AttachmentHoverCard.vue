<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HoverCardRootEmits, HoverCardRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { HoverCard } from "@/registry/edmi/ui/hover-card"

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<HoverCardRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <HoverCard v-bind="forwarded">
    <slot />
  </HoverCard>
</template>

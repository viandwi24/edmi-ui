<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HoverCardContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"
import { HoverCardContent } from "@/registry/edmi/ui/hover-card"

const props = withDefaults(defineProps<HoverCardContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "start",
})
const delegated = reactiveOmit(props, "class")
</script>

<template>
  <HoverCardContent v-bind="delegated" :class="cn('w-auto p-2', props.class)">
    <slot />
  </HoverCardContent>
</template>

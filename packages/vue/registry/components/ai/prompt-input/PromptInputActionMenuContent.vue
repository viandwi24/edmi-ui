<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { DropdownMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DropdownMenuContent } from "@/registry/edmi/ui/dropdown-menu"

const props = withDefaults(defineProps<DropdownMenuContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "start",
})
const delegated = reactiveOmit(props, "class")
</script>

<template>
  <DropdownMenuContent v-bind="delegated" :class="props.class">
    <slot />
  </DropdownMenuContent>
</template>

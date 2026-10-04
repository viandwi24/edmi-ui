<script setup lang="ts">
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

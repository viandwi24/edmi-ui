<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { DropdownMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardProps } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { DropdownMenuContent } from "@/registry/edmi/ui/dropdown-menu"

const props = withDefaults(defineProps<DropdownMenuContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "start",
})

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuContent data-slot="ai-open-in-content" v-bind="forwarded" :class="cn('w-[230px]', props.class)">
    <slot />
  </DropdownMenuContent>
</template>

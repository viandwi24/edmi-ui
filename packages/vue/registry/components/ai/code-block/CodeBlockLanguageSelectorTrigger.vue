<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardProps } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { SelectTrigger } from "@/registry/edmi/ui/select"

// Ghost trigger (board: a ghost xs button with a chevron).
const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()
const delegatedProps = reactiveOmit(props, "class")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'h-6 gap-1 rounded-md border-transparent bg-transparent px-2 text-xs font-normal text-foreground shadow-none hover:bg-accent data-[size=sm]:h-6 data-[size=sm]:rounded-md',
      props.class,
    )"
    size="sm"
  >
    <slot />
  </SelectTrigger>
</template>

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"
import { SelectTrigger } from "@/registry/edmi/ui/select"

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()
const delegated = reactiveOmit(props, "class")
</script>

<template>
  <SelectTrigger
    v-bind="delegated"
    :class="cn(
      'h-8 border-none bg-transparent px-2.5 text-[13px] font-medium text-foreground shadow-none transition-colors data-[size=default]:h-8',
      'hover:bg-accent data-[state=open]:bg-accent data-[state=open]:shadow-none',
      props.class,
    )"
  >
    <slot />
  </SelectTrigger>
</template>

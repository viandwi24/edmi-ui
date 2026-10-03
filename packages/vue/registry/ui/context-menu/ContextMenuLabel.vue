<script setup lang="ts">
import type { ContextMenuLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ContextMenuLabel } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<ContextMenuLabelProps & { class?: HTMLAttributes["class"], inset?: boolean }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    :data-inset="inset ? '' : undefined"
    v-bind="delegatedProps"
    :class="cn(
      `px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground data-[inset]:pl-8`, props.class)"
  >
    <slot />
  </ContextMenuLabel>
</template>

<script setup lang="ts">
import type { PaginationEllipsisProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { MoreHorizontal } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationEllipsis } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <PaginationEllipsis
    data-slot="pagination-ellipsis"
    v-bind="delegatedProps"
    :class="cn('flex size-8 items-center justify-center [&_svg:not([class*=size-])]:size-4', props.class)"
  >
    <slot>
      <MoreHorizontal />
      <span class="sr-only">More pages</span>
    </slot>
  </PaginationEllipsis>
</template>

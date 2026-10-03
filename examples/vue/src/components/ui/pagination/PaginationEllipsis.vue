<script setup lang="ts">
import type { PaginationEllipsisProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PhDotsThree } from '@phosphor-icons/vue'
import { reactiveOmit } from "@vueuse/core"
import { PaginationEllipsis } from "reka-ui"
import { cn } from '@/lib/utils'

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
      <PhDotsThree />
      <span class="sr-only">More pages</span>
    </slot>
  </PaginationEllipsis>
</template>

<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from "@vueuse/core"
import { PaginationListItem } from "reka-ui"
import { inject } from "vue"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const props = withDefaults(defineProps<PaginationListItemProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  isActive?: boolean
  /** ✦ overrides the Pagination `raised` for this link */
  raised?: boolean
}>(), {
  size: "icon",
  raised: undefined,
})

const context = inject<{ raised?: boolean } | null>("pagination", null)

const delegatedProps = reactiveOmit(props, "class", "size", "isActive", "raised")
</script>

<template>
  <PaginationListItem
    data-slot="pagination-item"
    v-bind="delegatedProps"
    :class="cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      isActive && 'bg-card font-semibold',
      isActive && (props.raised ?? context?.raised) && 'border-b-lip shadow-[0_2px_0_var(--lip)]',
      props.class)"
  >
    <slot />
  </PaginationListItem>
</template>

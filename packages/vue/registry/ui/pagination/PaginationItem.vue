<script setup lang="ts">
import type { PaginationListItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { reactiveOmit } from "@vueuse/core"
import { PaginationListItem } from "reka-ui"
import { computed, inject } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<PaginationListItemProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
  isActive?: boolean
  /** ✦ overrides the Pagination `elevation` for this link (the active link rises) */
  elevation?: Elevation
}>(), {
  size: "icon",
  elevation: undefined,
})

const context = inject<{ raised?: boolean } | null>("pagination", null)

const delegatedProps = reactiveOmit(props, "class", "size", "isActive", "elevation")

const raised = computed(() =>
  props.elevation && props.elevation !== "auto"
    ? props.elevation === "raised" || props.elevation === "floating"
    : !!context?.raised,
)
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
      isActive && raised && 'border-transparent shadow-btn-raised-neutral',
      props.class)"
  >
    <slot />
  </PaginationListItem>
</template>

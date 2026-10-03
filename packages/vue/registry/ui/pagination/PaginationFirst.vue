<script setup lang="ts">
import type { PaginationFirstProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { ChevronLeftIcon } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationFirst, useForwardProps } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { buttonVariants } from "@/registry/edmi/ui/button"

const props = withDefaults(defineProps<PaginationFirstProps & {
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}>(), {
  size: "default",
})

const delegatedProps = reactiveOmit(props, "class", "size")
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationFirst
    data-slot="pagination-first"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'pl-1.5!', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronLeftIcon data-icon="inline-start" class="rtl:rotate-180" />
      <span class="hidden sm:block">First</span>
    </slot>
  </PaginationFirst>
</template>

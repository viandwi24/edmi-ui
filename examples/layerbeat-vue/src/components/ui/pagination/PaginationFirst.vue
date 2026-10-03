<script setup lang="ts">
import type { PaginationFirstProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from '@/components/ui/button'
import { PhCaretLeft } from '@phosphor-icons/vue'
import { reactiveOmit } from "@vueuse/core"
import { PaginationFirst, useForwardProps } from "reka-ui"
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

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
      <PhCaretLeft data-icon="inline-start" class="rtl:rotate-180" />
      <span class="hidden sm:block">First</span>
    </slot>
  </PaginationFirst>
</template>

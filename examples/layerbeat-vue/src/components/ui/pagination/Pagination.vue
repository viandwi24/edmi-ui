<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationRoot, useForwardPropsEmits } from "reka-ui"
import { provide } from "vue"
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PaginationRootProps & {
  class?: HTMLAttributes["class"]
  /** ✦ the active page link gets the one-step 3D look */
  raised?: boolean
}>(), { raised: false })

provide("pagination", {
  get raised() { return props.raised },
})
const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "raised")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PaginationRoot
    v-slot="slotProps"
    data-slot="pagination"
    v-bind="forwarded"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <slot v-bind="slotProps" />
  </PaginationRoot>
</template>

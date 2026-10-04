<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PaginationRoot, useForwardPropsEmits } from "reka-ui"
import { computed, provide } from "vue"
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

const props = withDefaults(defineProps<PaginationRootProps & {
  class?: HTMLAttributes["class"]
  /** ✦ depth: raised +1 / floating +2 make the active page link rise */
  elevation?: Elevation
}>(), { elevation: undefined })

const level = useElevation(() => props.elevation, "control")
const raised = computed(() => level.value === "raised" || level.value === "floating")

provide("pagination", {
  get raised() { return raised.value },
})
const emits = defineEmits<PaginationRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "elevation")
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

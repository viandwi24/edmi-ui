<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Separator } from "reka-ui"
import { computed } from "vue"
import { cn } from '@/lib/utils'
import { useCommand } from "."

const props = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

// Like cmdk: hide the separator while searching.
const { filterState } = useCommand()
const isRender = computed(() => !filterState.search)
</script>

<template>
  <Separator
    v-if="isRender"
    data-slot="command-separator"
    v-bind="delegatedProps"
    :class="cn('-mx-1.5 my-1 h-px bg-border', props.class)"
  >
    <slot />
  </Separator>
</template>

<script setup lang="ts">
import type { DrawerHandleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerHandle, useForwardProps } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

// ✦ Grabber pill shown at the edge of a bottom/top drawer.
const props = defineProps<DrawerHandleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DrawerHandle
    data-slot="drawer-swipe-handle"
    v-bind="forwardedProps"
    :class="cn('mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border-2', props.class)"
  >
    <slot />
  </DrawerHandle>
</template>

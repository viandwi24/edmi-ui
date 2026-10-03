<script setup lang="ts">
import type { DrawerTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerTitle } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<DrawerTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="delegatedProps"
    :class="cn('text-base leading-snug font-semibold tracking-[-0.2px] text-foreground', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>

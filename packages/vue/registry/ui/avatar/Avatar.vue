<script setup lang="ts">
import type { AvatarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AvatarRoot } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<AvatarRootProps & {
  class?: HTMLAttributes['class']
  size?: 'default' | 'sm' | 'lg'
}>(), {
  size: 'default',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size"
    v-bind="delegatedProps"
    :class="cn('group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border data-[size=lg]:size-10 data-[size=sm]:size-6', props.class)"
  >
    <slot />
  </AvatarRoot>
</template>

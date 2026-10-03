<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/registry/edmi/lib/utils'
import { Separator } from '@/registry/edmi/ui/separator'

const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'horizontal',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Separator
    data-slot="item-separator"
    v-bind="delegatedProps"
    :class="cn('my-2', props.class)"
  />
</template>

<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogTitle
    data-slot="sheet-title"
    v-bind="delegatedProps"
    :class="cn('text-base leading-snug font-semibold tracking-[-0.2px] text-foreground', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import type { AlertDialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogTitle } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="delegatedProps"
    :class="cn('text-base leading-snug font-semibold tracking-[-0.2px] sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>

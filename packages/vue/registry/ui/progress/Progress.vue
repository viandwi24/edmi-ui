<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { computed, provide } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { progressPercentKey } from './context'

const props = withDefaults(
  defineProps<ProgressRootProps & {
    class?: HTMLAttributes['class']
    variant?: 'default' | 'brand'
  }>(),
  {
    modelValue: 0,
    variant: 'default',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'variant')

const percent = computed(() =>
  props.modelValue == null ? null : Math.round((props.modelValue / (props.max ?? 100)) * 100),
)
provide(progressPercentKey, percent)
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    :data-variant="variant"
    v-bind="delegatedProps"
    :class="cn('flex flex-wrap gap-3', props.class)"
  >
    <slot />
    <!-- 8px track: muted fill + 1px border, indicator is --primary (✦ variant="brand"). -->
    <div
      data-slot="progress-track"
      class="relative flex h-2 w-full items-center overflow-hidden rounded-full border border-border bg-muted"
    >
      <ProgressIndicator
        data-slot="progress-indicator"
        class="h-full w-full flex-1 rounded-full bg-primary transition-all [[data-variant=brand]_&]:bg-brand"
        :style="`transform: translateX(-${100 - (percent ?? 0)}%);`"
      />
    </div>
  </ProgressRoot>
</template>

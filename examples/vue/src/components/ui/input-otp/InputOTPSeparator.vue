<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PhMinus } from '@phosphor-icons/vue'
import { useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    v-bind="forwarded"
    :class="cn('flex items-center text-muted-foreground [&_svg:not([class*=\'size-\'])]:size-4', props.class)"
  >
    <slot>
      <PhMinus />
    </slot>
  </div>
</template>

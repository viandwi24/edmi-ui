<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { MinusIcon } from '@lucide/vue'
import { useForwardProps } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

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
      <MinusIcon />
    </slot>
  </div>
</template>

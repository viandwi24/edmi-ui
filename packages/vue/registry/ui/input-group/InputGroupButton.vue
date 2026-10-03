<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { InputGroupButtonVariants } from '.'
import type { ButtonVariants } from '@/registry/edmi/ui/button'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'
import { inputGroupButtonVariants } from '.'

interface InputGroupButtonProps {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'ghost',
})
</script>

<template>
  <Button
    type="button"
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>

<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectLabel } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground', props.class)"
  >
    <slot />
  </SelectLabel>
</template>

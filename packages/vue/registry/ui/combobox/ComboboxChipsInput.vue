<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxInput
    data-slot="combobox-chip-input"
    v-bind="forwarded"
    :class="cn('min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground', props.class)"
  />
</template>

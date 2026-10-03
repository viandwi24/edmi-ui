<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxAnchor, useForwardProps } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <ComboboxAnchor
    data-slot="combobox-chips"
    v-bind="forwarded"
    :class="cn('flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-card bg-clip-padding px-3 py-1 text-sm shadow-sunk focus-within:border-ring focus-within:shadow-ring has-aria-invalid:border-destructive has-aria-invalid:shadow-ring-error has-data-[slot=combobox-chip]:px-1.5', props.class)"
  >
    <slot />
  </ComboboxAnchor>
</template>

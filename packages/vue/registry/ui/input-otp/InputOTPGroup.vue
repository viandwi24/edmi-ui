<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'
import { inject } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)

const group = inject<{ readonly value: Elevation | undefined } | undefined>('inputOTPElevation', undefined)
const level = useElevation(() => group?.value, 'field')

// ✦ depth (v6): at sunken/raised/floating the group is one plate; slots turn transparent with 1px separators
const groupElevation = {
  sunken: 'rounded-lg border border-sk-bd bg-sk-bg shadow-sunken',
  flat: '',
  raised: 'rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised',
  floating: 'rounded-lg border border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating',
}
</script>

<template>
  <div
    data-slot="input-otp-group"
    v-bind="forwarded"
    :class="cn('flex items-center gap-1.5', level !== 'flat' && 'inline-flex gap-0', groupElevation[level], props.class)"
  >
    <slot />
  </div>
</template>

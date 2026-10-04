<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'
import { computed, inject } from 'vue'
import { useVueOTPContext } from 'vue-input-otp'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

const props = withDefaults(defineProps<{
  index: number
  class?: HTMLAttributes['class']
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
}>(), { elevation: undefined })

const delegatedProps = reactiveOmit(props, 'class', 'elevation')

const forwarded = useForwardProps(delegatedProps)

const context = useVueOTPContext()

const group = inject<{ readonly value: Elevation | undefined } | undefined>('inputOTPElevation', undefined)
const level = useElevation(() => props.elevation ?? group?.value, 'field')

// ✦ depth (v4): slots sink (-1) in layered mode; the active slot swaps the edge for the ring
const fieldElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken data-[active=true]:bg-card',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const slot = computed(() => context?.value.slots[props.index])
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="cn('relative flex size-10 items-center justify-center rounded-md border border-input bg-card font-mono text-sm text-foreground outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:shadow-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:shadow-ring-error', fieldElevation[level], props.class)"
  >
    {{ slot?.char }}
    <div v-if="slot?.hasFakeCaret" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="h-4 w-px animate-pulse bg-foreground duration-1000" />
    </div>
  </div>
</template>

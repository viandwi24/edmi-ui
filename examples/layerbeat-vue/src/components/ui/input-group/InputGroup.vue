<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
}>(), { elevation: undefined })

// ✦ depth (v4): the group is the field; focus-within swaps the edge for the ring
const groupElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken has-[[data-slot=input-group-control]:focus-visible]:bg-card',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const level = useElevation(() => props.elevation, 'field')
</script>

<template>
  <div
    data-slot="input-group"
    role="group"
    :class="cn(
      'group/input-group relative flex h-9 w-full min-w-0 items-stretch overflow-hidden rounded-md border border-input bg-card outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:shadow-none has-disabled:bg-muted has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:shadow-ring has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:shadow-ring-error has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3',
      groupElevation[level],
      props.class,
    )"
  >
    <slot />
  </div>
</template>

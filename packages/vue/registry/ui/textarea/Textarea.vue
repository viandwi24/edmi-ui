<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
}>(), { elevation: undefined })

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
const fieldElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken focus-visible:bg-card',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const level = useElevation(() => props.elevation, 'field')
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="cn('flex field-sizing-content min-h-24 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error', fieldElevation[level], props.class)"
  />
</template>

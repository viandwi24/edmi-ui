<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/registry/edmi/lib/utils'
import { type Elevation, useElevation } from '@/registry/edmi/ui/elevation'

const props = withDefaults(defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
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
  raised: 'border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised focus-visible:border-ring focus-visible:shadow-ring',
  floating: 'border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating focus-visible:border-ring focus-visible:shadow-ring',
}

const level = useElevation(() => props.elevation, 'field')
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'flex h-9 w-full min-w-0 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error',
      fieldElevation[level],
      props.class,
    )"
  >
</template>

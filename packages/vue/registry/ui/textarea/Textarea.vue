<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/registry/edmi/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="cn('flex field-sizing-content min-h-24 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground shadow-sunk outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error', props.class)"
  />
</template>

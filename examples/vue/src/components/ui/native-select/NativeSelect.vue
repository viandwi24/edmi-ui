<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: AcceptableValue | AcceptableValue[]
  size?: 'sm' | 'default'
  /** ✦ depth: sunken -1, flat 0, raised +1, floating +2 */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), {
  size: 'default',
  elevation: undefined,
})

const emit = defineEmits<{
  'update:modelValue': AcceptableValue
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
  defaultValue: '',
})

const delegatedProps = reactiveOmit(props, 'class', 'size', 'elevation')
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
  <div
    :class="cn('group/native-select relative w-fit has-[select:disabled]:opacity-50', props.class)"
    data-slot="native-select-wrapper"
    :data-size="size"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :data-size="size"
      :class="cn('h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-card pr-8 pl-3 text-sm text-foreground outline-none select-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[size=sm]:h-8 data-[size=sm]:rounded-[7px]', fieldElevation[level])"
    >
      <slot />
    </select>
    <PhCaretDown class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none" aria-hidden="true" data-slot="native-select-icon" />
  </div>
</template>

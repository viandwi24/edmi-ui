<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Layout } from './layout'
import { computed, ref, useId } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import LayoutPickerWireframe from './LayoutPickerWireframe.vue'

const props = withDefaults(defineProps<{
  modelValue?: Layout
  defaultValue?: Layout
  name?: string
  /** ✦ one-step 3D look on the option cards */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultValue: 'dashboard',
  raised: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Layout): void
}>()

const options: { value: Layout, label: string }[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'navbar', label: 'Navbar' },
]

const groupName = useId()
const inner = ref<Layout>(props.defaultValue)
const current = computed(() => props.modelValue ?? inner.value)

function choose(v: Layout) {
  inner.value = v
  emit('update:modelValue', v)
}
</script>

<template>
  <!-- Two choice cards (native radios, so arrows/Space work). Controlled (`v-model`) or uncontrolled. -->
  <div data-slot="layout-picker" role="radiogroup" :class="cn('flex flex-wrap gap-3', props.class)">
    <label
      v-for="o in options"
      :key="o.value"
      :class="cn(
        'group/lp flex w-[220px] cursor-pointer flex-col gap-2.5 rounded-xl border border-border bg-card p-3.5 has-[:checked]:border-ring has-[:checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] has-[:checked]:shadow-[0_0_0_1px_var(--ring)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring',
        props.raised && 'border-b-lip shadow-card has-[:checked]:border-b-ring',
      )"
    >
      <input
        type="radio"
        class="peer sr-only"
        :name="name ?? groupName"
        :value="o.value"
        :checked="current === o.value"
        @change="choose(o.value)"
      >
      <LayoutPickerWireframe :layout="o.value" />
      <span class="flex w-full items-center justify-between">
        <span class="text-sm font-medium">{{ o.label }}</span>
        <span class="flex size-[18px] items-center justify-center rounded-full border border-input bg-card shadow-sunk group-has-[:checked]/lp:border-primary group-has-[:checked]/lp:after:size-[9px] group-has-[:checked]/lp:after:rounded-full group-has-[:checked]/lp:after:bg-primary group-has-[:checked]/lp:after:content-['']" />
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Layout } from './layout'
import { PhX } from '@phosphor-icons/vue'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { type Elevation, useElevation } from '@/components/ui/elevation'
import { getLayoutCookie, setLayoutCookie } from './layout'
import LayoutPicker from './LayoutPicker.vue'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  /** Skip the cookie check and show immediately (docs/previews). */
  defaultOpen?: boolean
  /** Initially selected layout. */
  defaultValue?: Layout
  /** ✦ depth of the toast (floating is its natural level); raised +1 / floating +2 also raise the option cards */
  elevation?: Elevation
  class?: HTMLAttributes['class']
}>(), {
  title: 'Choose your layout',
  description: 'You can switch any time.',
  // Boolean props are cast to false when absent; keep undefined so the cookie check decides.
  defaultOpen: undefined,
  defaultValue: 'dashboard',
  elevation: undefined,
})

const level = useElevation(() => props.elevation, 'overlay')
const pickerElevation = computed(() =>
  props.elevation && props.elevation !== 'auto'
    ? (level.value === 'raised' || level.value === 'floating' ? 'raised' : 'flat')
    : undefined,
)
const toastElevation = {
  sunken: 'border-sk-bd bg-sk-bg shadow-sunken',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}

const emit = defineEmits<{
  (e: 'value-change', value: Layout): void
  (e: 'close'): void
}>()

// First-visit corner toast. Renders nothing once a layout cookie exists. Choosing saves the cookie;
// closing without choosing saves the default (`dashboard`) so it does not return.
const open = ref(false)
const value = ref<Layout>(props.defaultValue)

onMounted(() => {
  open.value = props.defaultOpen ?? getLayoutCookie() === undefined
})

function onChange(v: Layout) {
  value.value = v
  setLayoutCookie(v)
  emit('value-change', v)
}

function close() {
  if (getLayoutCookie() === undefined)
    setLayoutCookie(value.value)
  open.value = false
  emit('close')
}
</script>

<template>
  <div
    v-if="open"
    data-slot="layout-picker-toast"
    role="dialog"
    aria-label="Choose layout"
    :class="cn(
      'fixed right-4 bottom-4 z-50 w-[min(92vw,500px)] rounded-xl border border-border bg-popover p-4 text-popover-foreground',
      toastElevation[level],
      props.class,
    )"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <div class="text-sm font-semibold">
          {{ title }}
        </div>
        <div class="text-[13px] text-muted-foreground">
          {{ description }}
        </div>
      </div>
      <Button variant="ghost" size="icon-xs" aria-label="Close" @click="close">
        <PhX />
      </Button>
    </div>
    <LayoutPicker
      class="mt-3 flex-nowrap"
      :elevation="pickerElevation"
      :model-value="value"
      @update:model-value="onChange"
    />
  </div>
</template>

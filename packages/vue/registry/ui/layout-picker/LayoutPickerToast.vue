<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Layout } from './layout'
import { X } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'
import { getLayoutCookie, setLayoutCookie } from './layout'
import LayoutPicker from './LayoutPicker.vue'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  /** Skip the cookie check and show immediately (docs/previews). */
  defaultOpen?: boolean
  /** ✦ one-step 3D look on the toast and its option cards */
  raised?: boolean
  class?: HTMLAttributes['class']
}>(), {
  title: 'Choose your layout',
  description: 'You can switch any time.',
  // Boolean props are cast to false when absent; keep undefined so the cookie check decides.
  defaultOpen: undefined,
  raised: false,
})

const emit = defineEmits<{
  (e: 'value-change', value: Layout): void
  (e: 'close'): void
}>()

// First-visit corner toast. Renders nothing once a layout cookie exists. Choosing saves the cookie;
// closing without choosing saves the default (`dashboard`) so it does not return.
const open = ref(false)
const value = ref<Layout>('dashboard')

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
      props.raised && 'border-b-lip shadow-[0_3px_0_var(--lip)]',
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
        <X />
      </Button>
    </div>
    <LayoutPicker
      class="mt-3 flex-nowrap"
      :raised="raised"
      :model-value="value"
      @update:model-value="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { XIcon } from '@lucide/vue'
import { cn } from '@/registry/edmi/lib/utils'
import { Button } from '@/registry/edmi/ui/button'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  showRemove?: boolean
  disabled?: boolean
}>(), {
  showRemove: true,
})

const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <div
    data-slot="combobox-chip"
    :class="cn('flex h-[22px] w-fit items-center justify-center gap-1 rounded-md border border-border bg-secondary px-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0', props.class)"
  >
    <slot />
    <Button
      v-if="showRemove"
      variant="ghost"
      size="icon-xs"
      type="button"
      data-slot="combobox-chip-remove"
      class="-ml-1 size-5 opacity-50 hover:opacity-100"
      :disabled="disabled"
      aria-label="Remove"
      @click="emit('remove')"
    >
      <XIcon class="pointer-events-none" />
    </Button>
  </div>
</template>

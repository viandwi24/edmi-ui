<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon, XIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxAnchor, ComboboxCancel, ComboboxInput, ComboboxTrigger, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/registry/edmi/lib/utils'
import { InputGroup, InputGroupAddon, InputGroupButton } from '@/registry/edmi/ui/input-group'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
  showTrigger?: boolean
  showClear?: boolean
  disabled?: boolean
}>(), {
  showTrigger: true,
  showClear: false,
  disabled: false,
})

const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'showTrigger', 'showClear', 'disabled')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxAnchor as-child>
    <InputGroup :class="cn('w-auto', props.class)">
      <ComboboxInput
        v-bind="{ ...$attrs, ...forwarded }"
        :disabled="disabled"
        as-child
      >
        <input
          data-slot="input-group-control"
          class="h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        >
      </ComboboxInput>
      <InputGroupAddon align="inline-end">
        <ComboboxTrigger v-if="showTrigger" as-child :disabled="disabled">
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="combobox-trigger"
            class="group-has-data-[slot=combobox-clear]/input-group:hidden data-[state=open]:bg-transparent"
          >
            <ChevronDownIcon class="pointer-events-none size-4 text-muted-foreground" />
          </InputGroupButton>
        </ComboboxTrigger>
        <ComboboxCancel v-if="showClear" as-child :disabled="disabled">
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            data-slot="combobox-clear"
          >
            <XIcon class="pointer-events-none" />
          </InputGroupButton>
        </ComboboxCancel>
      </InputGroupAddon>
      <slot />
    </InputGroup>
  </ComboboxAnchor>
</template>

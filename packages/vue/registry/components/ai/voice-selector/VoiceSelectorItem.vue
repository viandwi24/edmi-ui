<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CommandItem } from "@/registry/edmi/ui/command"
import { useVoiceSelector } from "./context"

// A two-line row: lay out `VoiceSelectorPreview`, then a `VoiceSelectorDetails` block. The item whose `value`
// equals the selector value shows the check; selecting sets the value and closes the dialog.
const props = defineProps<{
  /** The voice id. */
  value: string
  class?: HTMLAttributes["class"]
}>()

const { value: selected, setValue, setOpen } = useVoiceSelector("VoiceSelectorItem")

function handleSelect() {
  setValue(props.value)
  setOpen(false)
}
</script>

<template>
  <CommandItem
    :value="props.value"
    :data-checked="props.value === selected"
    :class="cn('h-auto items-start p-2 whitespace-normal', props.class)"
    @select="handleSelect"
  >
    <slot />
    <Check class="ml-auto opacity-0 group-data-[checked=true]/command-item:opacity-100" />
  </CommandItem>
</template>

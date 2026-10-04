<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import { useCurrentElement } from "@vueuse/core"
import { onMounted, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CommandItem, useCommand } from "@/registry/edmi/ui/command"
import { useVoiceSelector } from "./context"

// A two-line row: lay out `VoiceSelectorPreview`, then a `VoiceSelectorDetails` block. The item whose `value`
// equals the selector value shows the check; selecting sets the value and closes the dialog.
const props = defineProps<{
  /** The voice id. */
  value: string
  /** Extra search terms (name, gender, accent). When set, the search matches these instead of the row text. */
  keywords?: string[]
  class?: HTMLAttributes["class"]
}>()

const { value: selected, setValue, setOpen } = useVoiceSelector("VoiceSelectorItem")

// CommandItem filters on the row's text content (it would match descriptions); keywords narrow it down
// like cmdk does in the other ports. The inner element carries the same id the command registered.
const { allItems } = useCommand()
const itemRef = ref()
const el = useCurrentElement(itemRef)
onMounted(() => {
  if (!props.keywords?.length || !(el.value instanceof HTMLElement)) return
  allItems.value.set(el.value.id, [props.value, ...props.keywords].join(" "))
})

function handleSelect() {
  setValue(props.value)
  setOpen(false)
}
</script>

<template>
  <CommandItem
    ref="itemRef"
    :value="props.value"
    :data-checked="props.value === selected"
    :class="cn('h-auto items-start p-2 whitespace-normal', props.class)"
    @select="handleSelect"
  >
    <slot />
    <Check class="ml-auto opacity-0 group-data-[checked=true]/command-item:opacity-100" />
  </CommandItem>
</template>

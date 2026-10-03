<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CommandItem } from "@/registry/edmi/ui/command"
import { useMicSelector } from "./context"

const props = defineProps<{
  /** The device id. */
  value: string
  class?: HTMLAttributes["class"]
}>()

const { value: selected, setValue, setOpen } = useMicSelector("MicSelectorItem")

function handleSelect() {
  setValue(props.value)
  setOpen(false)
}
</script>

<template>
  <CommandItem
    :value="props.value"
    :data-checked="props.value === selected"
    :class="cn(props.class)"
    @select="handleSelect"
  >
    <slot />
    <Check class="ml-auto opacity-0 group-data-[checked=true]/command-item:opacity-100" />
  </CommandItem>
</template>

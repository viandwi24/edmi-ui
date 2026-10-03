<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { CommandDialog } from "@/registry/edmi/ui/command"

const props = defineProps<DialogRootProps & { title?: string, description?: string }>()
const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CommandDialog v-bind="forwarded">
    <slot />
  </CommandDialog>
</template>

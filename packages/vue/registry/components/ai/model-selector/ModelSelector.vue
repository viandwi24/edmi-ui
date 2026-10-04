<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { Dialog } from "@/registry/edmi/ui/dialog"

// Built on ui/command + ui/dialog (DESIGN §5b): the palette body is the Edmi Command, the popup the Edmi Dialog.
const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <slot />
  </Dialog>
</template>

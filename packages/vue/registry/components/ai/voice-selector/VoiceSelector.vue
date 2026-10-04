<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import { computed, provide } from "vue"
import { Dialog } from "@/registry/edmi/ui/dialog"
import { VoiceSelectorKey } from "./context"

// Built on ui/command + ui/dialog (DESIGN §5b). `v-model:value` is the selected voice id.
const props = withDefaults(defineProps<{
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}>(), {
  value: undefined,
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<{
  (e: "update:value", value: string | undefined): void
  (e: "update:open", open: boolean): void
}>()

const value = useVModel(props, "value", emit, {
  defaultValue: props.defaultValue,
  passive: true,
})

const open = useVModel(props, "open", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

provide(VoiceSelectorKey, {
  value,
  setValue: (next) => { value.value = next },
  open: computed(() => !!open.value),
  setOpen: (next) => { open.value = next },
})
</script>

<template>
  <Dialog :open="!!open" :modal="modal" @update:open="(next) => (open = next)">
    <slot />
  </Dialog>
</template>

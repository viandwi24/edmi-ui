<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { PopoverRootProps } from "reka-ui"
import { useVModel } from "@vueuse/core"
import { computed, provide, ref, watch } from "vue"
import { Popover } from "@/registry/edmi/ui/popover"
import { MicSelectorKey } from "./context"
import { useAudioDevices } from "./useAudioDevices"

// Built on ui/popover + ui/command (DESIGN §5b). `v-model:value` is the selected device id.
const props = withDefaults(defineProps<Omit<PopoverRootProps, "open" | "defaultOpen"> & {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
  /** ✦ Devices to list. Omit to enumerate the audio inputs (asks for microphone permission when the list opens). */
  devices?: MediaDeviceInfo[]
}>(), {
  value: undefined,
  open: undefined,
  defaultOpen: false,
  devices: undefined,
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

const width = ref(200)

const { devices: enumerated, hasPermission, loadDevices, loading } = useAudioDevices()
const devices = computed(() => props.devices ?? enumerated.value)

watch([open, hasPermission, loading], ([isOpen, permitted, isLoading]) => {
  if (!props.devices && isOpen && !permitted && !isLoading)
    loadDevices()
})

provide(MicSelectorKey, {
  devices,
  value,
  setValue: (next) => { value.value = next },
  open: computed(() => !!open.value),
  setOpen: (next) => { open.value = next },
  width,
  setWidth: (next) => { width.value = next },
})
</script>

<template>
  <Popover :open="!!open" :modal="modal" @update:open="(next) => (open = next)">
    <slot />
  </Popover>
</template>

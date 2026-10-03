<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { SelectRootEmits, SelectRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { Select } from "@/registry/edmi/ui/select"

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select v-bind="forwarded">
    <slot />
  </Select>
</template>

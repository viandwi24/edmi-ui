<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "reka-ui"
import { useForwardPropsEmits } from "reka-ui"
import { DropdownMenu } from "@/registry/edmi/ui/dropdown-menu"

const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenu v-bind="forwarded">
    <slot />
  </DropdownMenu>
</template>

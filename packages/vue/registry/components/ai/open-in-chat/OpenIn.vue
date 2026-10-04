<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from "reka-ui"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { DropdownMenu } from "@/registry/edmi/ui/dropdown-menu"
import { provideOpenInContext } from "./context"

/** Dropdown that sends `query` to another AI app. */
const props = defineProps<DropdownMenuRootProps & { query: string }>()
const emits = defineEmits<DropdownMenuRootEmits>()

provideOpenInContext({
  get query() {
    return props.query
  },
})

const delegatedProps = reactiveOmit(props, "query")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenu v-bind="forwarded">
    <slot />
  </DropdownMenu>
</template>

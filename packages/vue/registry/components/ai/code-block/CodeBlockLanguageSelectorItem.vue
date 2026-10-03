<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectItem } from "@/registry/edmi/ui/select"

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectItem v-bind="props">
    <slot />
  </SelectItem>
</template>

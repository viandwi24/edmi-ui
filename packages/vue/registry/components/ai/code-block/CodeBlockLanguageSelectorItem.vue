<script setup lang="ts">
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

<script setup lang="ts">
import type { SelectValueProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectValue } from "@/registry/edmi/ui/select"

const props = defineProps<SelectValueProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectValue v-bind="props">
    <slot />
  </SelectValue>
</template>

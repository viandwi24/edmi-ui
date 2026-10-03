<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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

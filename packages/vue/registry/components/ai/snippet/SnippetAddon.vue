<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { InputGroupVariants } from "@/registry/edmi/ui/input-group"
import { InputGroupAddon } from "@/registry/edmi/ui/input-group"

const props = defineProps<{
  align?: InputGroupVariants["align"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <InputGroupAddon :align="props.align" :class="props.class">
    <slot />
  </InputGroupAddon>
</template>

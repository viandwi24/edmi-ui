<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupAddon } from "@/registry/edmi/ui/input-group"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <InputGroupAddon
    align="block-end"
    :class="cn('justify-between gap-1 px-2 pt-1.5 pb-2', props.class)"
  >
    <slot />
  </InputGroupAddon>
</template>

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
    align="block-start"
    :class="cn('flex-wrap gap-1.5 px-3 pt-2.5 pb-0 has-[>:empty]:hidden', props.class)"
  >
    <slot />
  </InputGroupAddon>
</template>

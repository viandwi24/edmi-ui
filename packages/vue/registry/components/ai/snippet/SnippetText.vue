<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupText } from "@/registry/edmi/ui/input-group"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <InputGroupText :class="cn('pl-2 font-mono text-xs font-normal', props.class)">
    <slot />
  </InputGroupText>
</template>

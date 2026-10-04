<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CommandInput } from "@/registry/edmi/ui/command"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  placeholder?: string
}>()
</script>

<template>
  <CommandInput
    :placeholder="props.placeholder"
    :class="cn('py-3.5', props.class)"
  />
</template>

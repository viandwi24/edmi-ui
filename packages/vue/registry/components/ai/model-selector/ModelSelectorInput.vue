<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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

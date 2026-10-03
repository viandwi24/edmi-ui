<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { PlusIcon } from "@lucide/vue"
import { DropdownMenuTrigger } from "@/registry/edmi/ui/dropdown-menu"
import PromptInputButton from "./PromptInputButton.vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <DropdownMenuTrigger as-child>
    <PromptInputButton :class="props.class">
      <slot>
        <PlusIcon class="size-4" />
      </slot>
    </PromptInputButton>
  </DropdownMenuTrigger>
</template>

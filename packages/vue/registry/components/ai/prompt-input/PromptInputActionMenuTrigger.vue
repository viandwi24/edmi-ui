<script setup lang="ts">
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

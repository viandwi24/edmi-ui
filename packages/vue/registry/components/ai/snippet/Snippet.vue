<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroup } from "@/registry/edmi/ui/input-group"
import { SnippetKey } from "./context"

const props = defineProps<{
  code: string
  class?: HTMLAttributes["class"]
}>()

provide(SnippetKey, {
  code: computed(() => props.code),
})
</script>

<template>
  <InputGroup data-slot="ai-snippet" :class="cn('font-mono', props.class)">
    <slot />
  </InputGroup>
</template>

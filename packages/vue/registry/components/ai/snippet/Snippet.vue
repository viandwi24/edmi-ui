<script setup lang="ts">
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

<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useSchemaDisplayContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { path } = useSchemaDisplayContext("SchemaDisplayPath")

// `{param}` segments are highlighted; everything else is plain text.
const parts = computed(() =>
  path.value.split(/(\{[^}]+\})/g).filter(Boolean).map(text => ({ text, param: text.startsWith("{") })))
</script>

<template>
  <span
    data-slot="ai-schema-display-path"
    :class="cn('font-mono text-[13.5px]', props.class)"
  >
    <slot>
      <template v-for="(part, index) in parts" :key="`${part.text}-${index}`">
        <span v-if="part.param" class="text-chart-2">{{ part.text }}</span>
        <template v-else>{{ part.text }}</template>
      </template>
    </slot>
  </span>
</template>

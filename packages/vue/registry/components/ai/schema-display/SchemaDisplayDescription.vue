<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { useSchemaDisplayContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { description } = useSchemaDisplayContext("SchemaDisplayDescription")
</script>

<template>
  <p
    data-slot="ai-schema-display-description"
    :class="cn('-mt-2 px-4 pb-3.5 text-xs text-muted-foreground', props.class)"
  >
    <slot>{{ description }}</slot>
  </p>
</template>

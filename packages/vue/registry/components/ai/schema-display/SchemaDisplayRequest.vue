<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useSchemaDisplayContext } from "./context"
import SchemaDisplayProperty from "./SchemaDisplayProperty.vue"
import SchemaDisplaySection from "./SchemaDisplaySection.vue"

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: true,
})

const { requestBody } = useSchemaDisplayContext("SchemaDisplayRequest")
</script>

<template>
  <SchemaDisplaySection
    data-slot="ai-schema-display-request"
    title="Request body"
    :default-open="props.defaultOpen"
    :class="props.class"
  >
    <slot>
      <SchemaDisplayProperty v-for="prop in requestBody" :key="prop.name" v-bind="prop" :depth="0" />
    </slot>
  </SchemaDisplaySection>
</template>

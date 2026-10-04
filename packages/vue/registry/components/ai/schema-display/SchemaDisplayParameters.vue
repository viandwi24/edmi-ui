<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useSchemaDisplayContext } from "./context"
import SchemaDisplayParameter from "./SchemaDisplayParameter.vue"
import SchemaDisplaySection from "./SchemaDisplaySection.vue"

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: true,
})

const { parameters } = useSchemaDisplayContext("SchemaDisplayParameters")
</script>

<template>
  <SchemaDisplaySection
    data-slot="ai-schema-display-parameters"
    title="Parameters"
    :default-open="props.defaultOpen"
    :class="props.class"
  >
    <slot>
      <SchemaDisplayParameter v-for="param in parameters" :key="param.name" v-bind="param" />
    </slot>
  </SchemaDisplaySection>
</template>

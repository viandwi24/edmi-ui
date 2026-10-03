<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { HttpMethod, SchemaParameter, SchemaProperty } from "./context"
import { computed, provide } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { SchemaDisplayKey } from "./context"
import SchemaDisplayContent from "./SchemaDisplayContent.vue"
import SchemaDisplayDescription from "./SchemaDisplayDescription.vue"
import SchemaDisplayHeader from "./SchemaDisplayHeader.vue"
import SchemaDisplayMethod from "./SchemaDisplayMethod.vue"
import SchemaDisplayParameters from "./SchemaDisplayParameters.vue"
import SchemaDisplayPath from "./SchemaDisplayPath.vue"
import SchemaDisplayRequest from "./SchemaDisplayRequest.vue"
import SchemaDisplayResponse from "./SchemaDisplayResponse.vue"

const props = defineProps<{
  method: HttpMethod
  path: string
  description?: string
  parameters?: SchemaParameter[]
  requestBody?: SchemaProperty[]
  responseBody?: SchemaProperty[]
  class?: HTMLAttributes["class"]
}>()

provide(SchemaDisplayKey, {
  method: computed(() => props.method),
  path: computed(() => props.path),
  description: computed(() => props.description),
  parameters: computed(() => props.parameters),
  requestBody: computed(() => props.requestBody),
  responseBody: computed(() => props.responseBody),
})
</script>

<template>
  <div
    data-slot="ai-schema-display"
    :class="cn('overflow-hidden rounded-xl border border-border bg-card', props.class)"
  >
    <slot>
      <SchemaDisplayHeader>
        <SchemaDisplayMethod />
        <SchemaDisplayPath />
      </SchemaDisplayHeader>
      <SchemaDisplayDescription v-if="props.description" />
      <SchemaDisplayContent>
        <SchemaDisplayParameters v-if="props.parameters?.length" />
        <SchemaDisplayRequest v-if="props.requestBody?.length" />
        <SchemaDisplayResponse v-if="props.responseBody?.length" />
      </SchemaDisplayContent>
    </slot>
  </div>
</template>

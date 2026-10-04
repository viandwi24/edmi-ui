<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { HttpMethod } from "./context"
import { cn } from "@/registry/edmi/lib/utils"
import { useSchemaDisplayContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { method } = useSchemaDisplayContext("SchemaDisplayMethod")

// Solid soft fills, never /NN opacity (DESIGN §4.16). GET success, POST info, PUT/PATCH warning, DELETE destructive.
const methodStyles: Record<HttpMethod, string> = {
  DELETE: "bg-destructive-soft text-destructive-text",
  GET: "bg-success-soft text-success-text",
  PATCH: "bg-warning-soft text-warning-text",
  POST: "bg-info-soft text-info-text",
  PUT: "bg-warning-soft text-warning-text",
}
</script>

<template>
  <span
    data-slot="ai-schema-display-method"
    :data-method="method"
    :class="cn(
      'inline-flex rounded-[5px] px-[7px] py-0.5 font-mono text-[11px] font-semibold',
      methodStyles[method],
      props.class,
    )"
  >
    <slot>{{ method }}</slot>
  </span>
</template>

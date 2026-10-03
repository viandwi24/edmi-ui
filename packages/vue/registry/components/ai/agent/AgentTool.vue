<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { Settings2Icon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/edmi/ui/accordion"
import { CodeBlock } from "@/registry/edmi/components/ai/code-block"

const props = defineProps<{
  /** Matches the AI SDK `Tool` shape (`description`, `inputSchema`); a string schema is shown as typescript, anything else as JSON. */
  tool: { description?: string, inputSchema?: unknown, jsonSchema?: unknown }
  value: string
  /** ✦ Tool name shown in mono before the description; falls back to `value`. */
  name?: string
  class?: HTMLAttributes["class"]
}>()

const schema = computed(() =>
  "jsonSchema" in props.tool && props.tool.jsonSchema ? props.tool.jsonSchema : props.tool.inputSchema,
)
const isString = computed(() => typeof schema.value === "string")
const code = computed(() => (isString.value ? (schema.value as string) : JSON.stringify(schema.value, null, 2)))
</script>

<template>
  <AccordionItem
    :value="props.value"
    :class="cn('border-t-0 border-b border-border-2', props.class)"
  >
    <AccordionTrigger class="gap-2 py-[9px] text-[13px] font-normal">
      <Settings2Icon class="size-3.5 shrink-0 text-muted-foreground" />
      <span class="font-mono text-[12.5px]">{{ props.name ?? props.value }}</span>
      <span class="min-w-0 flex-1 truncate text-[13px] font-normal text-muted-foreground">
        {{ props.tool.description ?? "No description" }}
      </span>
    </AccordionTrigger>
    <AccordionContent class="pb-2.5">
      <CodeBlock
        class="rounded-lg border-0 bg-muted"
        :code="code"
        :language="isString ? 'typescript' : 'json'"
      />
    </AccordionContent>
  </AccordionItem>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CodeBlock } from "@/registry/edmi/components/ai/code-block"

const props = defineProps<{
  schema: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5', props.class)">
    <span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">Output schema</span>
    <CodeBlock class="rounded-lg border-0 bg-muted" :code="props.schema" language="typescript" />
  </div>
</template>

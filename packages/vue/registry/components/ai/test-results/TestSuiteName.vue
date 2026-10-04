<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { useTestSuiteContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { name, status } = useTestSuiteContext()

const variants = {
  failed: "destructive",
  passed: "success",
  running: "info",
  skipped: "warning",
} as const
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-test-suite-name"
    :class="cn(
      'group/ai-test-suite flex w-full items-center gap-2 py-1.5 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <ChevronDownIcon class="size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/ai-test-suite:rotate-180" />
    <span class="font-mono text-[12.5px]"><slot>{{ name }}</slot></span>
    <Badge class="h-[18px] text-[10.5px]" :variant="variants[status]">
      {{ status }}
    </Badge>
  </CollapsibleTrigger>
</template>

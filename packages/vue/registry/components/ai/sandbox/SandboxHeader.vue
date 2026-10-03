<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ToolUIPart } from "ai"
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon, Terminal } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import SandboxStatusBadge from "./SandboxStatusBadge.vue"

const props = defineProps<{
  title?: string
  state: ToolUIPart["state"]
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-sandbox-header"
    :class="cn(
      'group/ai-sandbox-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <Terminal class="size-[15px] shrink-0 text-muted-foreground" />
    <span class="font-mono text-[12.5px]">{{ props.title }}</span>
    <SandboxStatusBadge :state="props.state" />
    <ChevronDownIcon class="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/ai-sandbox-trigger:rotate-180" />
  </CollapsibleTrigger>
</template>

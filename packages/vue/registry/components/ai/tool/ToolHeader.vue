<script setup lang="ts">
import type { DynamicToolUIPart, ToolUIPart } from "ai"
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon, SettingsIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import ToolStatusBadge from "./ToolStatusBadge.vue"

type ToolHeaderProps = {
  title?: string
  class?: HTMLAttributes["class"]
} & (
  | { type: ToolUIPart["type"], state: ToolUIPart["state"], toolName?: never }
  | { type: DynamicToolUIPart["type"], state: DynamicToolUIPart["state"], toolName: string }
)

const props = defineProps<ToolHeaderProps>()

const derivedName = computed(() =>
  props.type === "dynamic-tool"
    ? props.toolName
    : props.type.split("-").slice(1).join("-"),
)
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-tool-header"
    :class="cn(
      'group/tool-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13.5px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <SettingsIcon class="size-[15px] shrink-0 text-muted-foreground" />
    <span class="font-mono text-[12.5px]">{{ props.title ?? derivedName }}</span>
    <ToolStatusBadge :state="props.state" />
    <ChevronDownIcon
      class="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/tool-trigger:rotate-180"
    />
  </CollapsibleTrigger>
</template>

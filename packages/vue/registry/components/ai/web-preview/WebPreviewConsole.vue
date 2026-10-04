<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { useWebPreviewContext } from "./context"

type LogLevel = "log" | "warn" | "error"

interface ConsoleLog {
  level: LogLevel
  message: string
  timestamp: Date
}

const props = withDefaults(defineProps<{
  logs?: ConsoleLog[]
  class?: HTMLAttributes["class"]
}>(), {
  logs: () => [],
})

const context = useWebPreviewContext()

function levelClass(level: LogLevel) {
  if (level === "error")
    return "text-destructive-text"
  if (level === "warn")
    return "text-warning-text"
  return "text-foreground"
}
</script>

<template>
  <Collapsible
    data-slot="ai-web-preview-console"
    :class="cn('border-t border-border bg-card font-mono text-[11.5px] leading-[1.8]', props.class)"
    :open="context.consoleOpen.value"
    @update:open="context.setConsoleOpen"
  >
    <CollapsibleTrigger class="group/ai-console flex w-full items-center justify-between px-3 pt-2 pb-1 text-left font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
      Console
      <ChevronDownIcon class="size-3.5 transition-transform duration-200 group-data-[state=open]/ai-console:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent class="overflow-hidden">
      <div class="max-h-48 overflow-y-auto px-3 pb-2">
        <p v-if="!props.logs.length" class="text-muted-foreground">
          No console output
        </p>
        <template v-else>
          <div
            v-for="(log, index) in props.logs"
            :key="`${log.timestamp.getTime?.() ?? index}-${index}`"
            :class="levelClass(log.level)"
          >
            <span class="text-muted-foreground">{{ log.timestamp.toLocaleTimeString([], { hour12: false }) }}</span>
            {{ " " }}{{ log.level.padEnd(4, " ") }} {{ log.message }}
          </div>
        </template>
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

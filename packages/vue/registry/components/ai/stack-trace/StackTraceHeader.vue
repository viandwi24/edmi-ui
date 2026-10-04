<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { useStackTraceContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isOpen, setIsOpen } = useStackTraceContext("StackTraceHeader")
</script>

<template>
  <CollapsibleTrigger as-child>
    <div
      data-slot="ai-stack-trace-header"
      role="button"
      tabindex="0"
      :aria-expanded="!!isOpen"
      :class="cn(
        'flex w-full cursor-pointer items-start gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
        props.class,
      )"
      @keydown.enter.self.prevent="setIsOpen(!isOpen)"
      @keydown.space.self.prevent="setIsOpen(!isOpen)"
    >
      <slot />
    </div>
  </CollapsibleTrigger>
</template>

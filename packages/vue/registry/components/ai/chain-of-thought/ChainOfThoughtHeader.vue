<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon, SparklesIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"
import { useChainOfThoughtContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isOpen, setIsOpen } = useChainOfThoughtContext()
</script>

<template>
  <Collapsible :open="isOpen" @update:open="setIsOpen">
    <CollapsibleTrigger
      data-slot="ai-chain-of-thought-header"
      :class="cn(
        'flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        props.class,
      )"
    >
      <SparklesIcon class="size-4" />
      <span class="flex-1 text-left"><slot>Chain of thought</slot></span>
      <ChevronDownIcon
        :class="cn('size-4 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')"
      />
    </CollapsibleTrigger>
  </Collapsible>
</template>

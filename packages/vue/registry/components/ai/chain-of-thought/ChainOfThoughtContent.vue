<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Collapsible, CollapsibleContent } from "@/registry/edmi/ui/collapsible"
import { useChainOfThoughtContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { isOpen } = useChainOfThoughtContext()
</script>

<template>
  <Collapsible :open="isOpen">
    <CollapsibleContent
      data-slot="ai-chain-of-thought-content"
      :class="cn(
        'overflow-hidden outline-none data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        props.class,
      )"
    >
      <div class="pl-0.5">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
// Shared collapsible section (title + body) behind Parameters, Request and Response.
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon } from "@lucide/vue"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = withDefaults(defineProps<{
  title: string
  defaultOpen?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: true,
})
</script>

<template>
  <Collapsible :class="props.class" :default-open="props.defaultOpen">
    <CollapsibleTrigger class="group/ai-schema-trigger flex w-full items-center gap-2 px-4 py-2 text-left text-[13.5px] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
      <ChevronDownIcon class="size-3.5 shrink-0 transition-transform group-data-[state=open]/ai-schema-trigger:rotate-180" />
      <span>{{ props.title }}</span>
    </CollapsibleTrigger>
    <CollapsibleContent class="overflow-hidden">
      <div class="px-4 pb-2.5">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronDownIcon, CircleCheckIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  title: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="ai-task-trigger"
    :class="cn(
      'group/task-trigger flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      props.class,
    )"
  >
    <slot>
      <CircleCheckIcon class="size-4" />
      <span>{{ title }}</span>
      <ChevronDownIcon
        class="ml-auto size-4 transition-transform group-data-[state=open]/task-trigger:rotate-180"
      />
    </slot>
  </CollapsibleTrigger>
</template>

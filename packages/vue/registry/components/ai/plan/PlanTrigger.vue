<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ChevronsUpDownIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <CollapsibleTrigger as-child>
    <Button
      data-slot="ai-plan-trigger"
      variant="ghost"
      size="icon-sm"
      :class="cn('size-8 data-[state=open]:bg-transparent hover:data-[state=open]:bg-accent', props.class)"
    >
      <slot>
        <ChevronsUpDownIcon class="size-4" />
        <span class="sr-only">Toggle plan</span>
      </slot>
    </Button>
  </CollapsibleTrigger>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { SchemaProperty } from "./context"
import { ChevronDownIcon } from "@lucide/vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/edmi/ui/collapsible"

const props = withDefaults(defineProps<{
  name: string
  type: string
  required?: boolean
  description?: string
  properties?: SchemaProperty[]
  items?: SchemaProperty
  depth?: number
  class?: HTMLAttributes["class"]
}>(), {
  depth: 0,
})

const hasChildren = computed(() => !!props.properties || !!props.items)
const paddingLeft = computed(() => props.depth * 16)
</script>

<template>
  <Collapsible v-if="hasChildren" :default-open="props.depth < 2">
    <CollapsibleTrigger
      :class="cn(
        'group/ai-schema-property flex w-full items-center gap-2 py-1.5 text-left text-[12.5px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        props.class,
      )"
      :style="{ paddingLeft: `${paddingLeft}px` }"
    >
      <ChevronDownIcon class="size-3.5 shrink-0 -rotate-90 text-muted-foreground transition-transform group-data-[state=open]/ai-schema-property:rotate-0" />
      <span class="font-mono font-medium">{{ props.name }}</span>
      <span class="font-mono text-muted-foreground">{{ props.type }}</span>
      <Badge v-if="props.required" class="h-[18px] text-[10.5px]" variant="warning">
        required
      </Badge>
      <span v-if="props.description" class="ml-auto text-right text-xs text-muted-foreground">{{ props.description }}</span>
    </CollapsibleTrigger>
    <CollapsibleContent class="overflow-hidden">
      <div>
        <SchemaDisplayProperty
          v-for="prop in props.properties"
          :key="prop.name"
          v-bind="prop"
          :depth="props.depth + 1"
        />
        <SchemaDisplayProperty
          v-if="props.items"
          v-bind="props.items"
          :depth="props.depth + 1"
          :name="`${props.name}[]`"
        />
      </div>
    </CollapsibleContent>
  </Collapsible>
  <div
    v-else
    data-slot="ai-schema-display-property"
    :class="cn('flex items-center gap-2 py-1.5 text-[12.5px]', props.class)"
    :style="{ paddingLeft: `${paddingLeft + (props.depth > 0 ? 22 : 0)}px` }"
  >
    <span class="font-mono font-medium">{{ props.name }}</span>
    <span class="font-mono text-muted-foreground">{{ props.type }}</span>
    <Badge v-if="props.required" class="h-[18px] text-[10.5px]" variant="warning">
      required
    </Badge>
    <span v-if="props.description" class="ml-auto text-right text-xs text-muted-foreground">{{ props.description }}</span>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Badge variant="warning" :class="cn('col-start-2 h-[18px] text-[10.5px]', props.class)">
    <slot>Required</slot>
  </Badge>
</template>

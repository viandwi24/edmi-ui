<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Badge variant="warning" :class="cn('h-[18px] text-[10.5px]', props.class)">
    <slot>Required</slot>
  </Badge>
</template>

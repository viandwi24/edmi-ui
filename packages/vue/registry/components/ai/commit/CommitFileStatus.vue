<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"

const props = defineProps<{
  status: "added" | "modified" | "deleted" | "renamed"
  class?: HTMLAttributes["class"]
}>()

const variants = {
  added: "success",
  deleted: "destructive",
  modified: "warning",
  renamed: "info",
} as const

const labels = { added: "A", deleted: "D", modified: "M", renamed: "R" }

const variant = computed(() => variants[props.status])
</script>

<template>
  <Badge
    :variant="variant"
    :class="cn('h-[18px] w-5 justify-center p-0 font-mono text-[10.5px]', props.class)"
  >
    <slot>{{ labels[props.status] }}</slot>
  </Badge>
</template>

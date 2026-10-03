<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Badge } from "@/registry/edmi/ui/badge"
import { usePackageInfoContext } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()

const { changeType } = usePackageInfoContext()

// major = destructive, minor = warning, patch = success, added = info (soft fill, tinted border).
const variants = {
  added: "info",
  major: "destructive",
  minor: "warning",
  patch: "success",
  removed: "secondary",
} as const

const variant = computed(() => (changeType.value ? variants[changeType.value] : undefined))
</script>

<template>
  <Badge v-if="changeType" :variant="variant" :class="cn('h-5', props.class)">
    <slot>{{ changeType }}</slot>
  </Badge>
</template>

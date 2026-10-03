<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Separator } from "@/registry/edmi/ui/separator"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Separator :class="cn('my-3', props.class)" />
</template>

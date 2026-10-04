<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('select-none text-muted-foreground-2', props.class)"
  >&middot;</span>
</template>

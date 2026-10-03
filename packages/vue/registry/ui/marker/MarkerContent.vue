<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="marker-content"
    :class="cn('min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground', props.class)"
  >
    <slot />
  </span>
</template>

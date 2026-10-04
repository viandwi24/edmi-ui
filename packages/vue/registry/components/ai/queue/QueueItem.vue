<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="ai-queue-item"
    :class="cn(
      'group/queue-item flex flex-col gap-0.5 rounded-[7px] px-2 py-[7px] text-[13.5px] transition-colors hover:bg-accent',
      props.class,
    )"
  >
    <slot />
  </li>
</template>

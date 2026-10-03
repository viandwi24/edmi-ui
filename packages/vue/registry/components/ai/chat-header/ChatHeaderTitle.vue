<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Title with its indicators; put `ChatHeaderProject` and `ChatHeaderMenu` inside. -->
  <div data-slot="ai-chat-header-title" :class="cn('flex min-w-0 items-center gap-2.5 text-[14.5px]', props.class)">
    <slot />
  </div>
</template>

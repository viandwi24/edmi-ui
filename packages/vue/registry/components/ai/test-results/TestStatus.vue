<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CircleCheckIcon } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"
import { statusStyles, useTestContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { status } = useTestContext()
</script>

<template>
  <span :class="cn('inline-flex shrink-0', statusStyles[status], props.class)">
    <slot>
      <CircleCheckIcon v-if="status === 'passed'" class="size-3.5" />
      <svg
        v-else-if="status === 'failed'"
        aria-hidden="true"
        class="size-3.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.7"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6M15 9l-6 6" />
      </svg>
      <svg
        v-else-if="status === 'running'"
        aria-hidden="true"
        class="size-3.5 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".22" stroke-width="2" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        class="size-3.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.7"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    </slot>
  </span>
</template>

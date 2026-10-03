<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { ChevronRight } from "@lucide/vue"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:size-3.5', props.class)"
  >
    <slot>
      <ChevronRight class="rtl:rotate-180" />
    </slot>
  </li>
</template>

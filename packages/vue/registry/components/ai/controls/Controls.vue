<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Controls as ControlsPrimitive } from "@vue-flow/controls"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/registry/edmi/lib/utils"
import "@vue-flow/controls/dist/style.css"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <!-- Zoom in, zoom out, fit view and lock, stacked in one bordered card group. -->
  <ControlsPrimitive
    data-slot="ai-controls"
    v-bind="delegatedProps"
    :class="cn(
      'overflow-hidden rounded-[calc(var(--radius)*0.9)] border border-border bg-card shadow-none!',
      '[&>button]:box-border! [&>button]:size-[30px]! [&>button]:rounded-none! [&>button]:border-0! [&>button]:border-b! [&>button]:border-border! [&>button]:bg-transparent! [&>button]:p-0! [&>button]:text-foreground-2! [&>button]:last:border-b-0! [&>button]:hover:bg-accent!',
      '[&>button>svg]:size-[15px]! [&>button>svg]:max-h-none! [&>button>svg]:max-w-none!',
      props.class,
    )"
  />
</template>

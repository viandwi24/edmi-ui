<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Controls as ControlsPrimitive } from "@vue-flow/controls"
import { reactiveOmit } from "@vueuse/core"
import { onMounted, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import "@vue-flow/controls/dist/style.css"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const delegatedProps = reactiveOmit(props, "class")

// Vue Flow renders icon-only buttons without a name: label them like the other ports.
const labels: Record<string, string> = {
  "vue-flow__controls-zoomin": "Zoom In",
  "vue-flow__controls-zoomout": "Zoom Out",
  "vue-flow__controls-fitview": "Fit View",
  "vue-flow__controls-interactive": "Toggle Interactivity",
}
const root = ref<{ $el?: HTMLElement } | null>(null)
onMounted(() => {
  const el = root.value?.$el
  if (!el) return
  for (const [cls, label] of Object.entries(labels)) {
    const button = el.querySelector<HTMLElement>(`.${cls}`)
    if (button && !button.getAttribute("aria-label")) {
      button.setAttribute("aria-label", label)
      button.setAttribute("title", label)
    }
  }
})
</script>

<template>
  <!-- Zoom in, zoom out, fit view and lock, stacked in one bordered card group. -->
  <ControlsPrimitive
    ref="root"
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

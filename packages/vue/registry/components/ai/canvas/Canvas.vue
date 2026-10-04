<script setup lang="ts">
import type { FlowEmits, FlowProps } from "@vue-flow/core"
import { Background } from "@vue-flow/background"
import { VueFlow } from "@vue-flow/core"
import { useForwardPropsEmits } from "reka-ui"
import { computed, useSlots } from "vue"
import "@vue-flow/core/dist/style.css"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FlowProps>(), {
  deleteKeyCode: () => ["Backspace", "Delete"],
  fitViewOnInit: true,
  panOnDrag: false,
  panOnScroll: true,
  selectNodesOnDrag: true,
  zoomOnDoubleClick: false,
})

const emits = defineEmits<FlowEmits>()
const slots = useSlots()
// Every slot except the default one is handed to Vue Flow as is (#node-<type>, #edge-<type>, ...).
const forwardedSlotNames = computed(() => Object.keys(slots).filter((n) => n !== "default"))
// The FlowProps type is deep enough to hit TS2589 in the generic helper: widen it.
const forwarded = useForwardPropsEmits(props as Record<string, unknown>, emits as any)
</script>

<template>
  <!--
    Workflow surface: dotted --input dots on --background. Edge, selection and connection colors are
    mapped to Edmi tokens here because Vue Flow ships its defaults as plain colors.
  -->
  <VueFlow
    data-slot="ai-canvas"
    v-bind="{ ...$attrs, ...forwarded }"
    class="bg-background"
  >
    <Background :gap="18" :size="1" pattern-color="var(--input)" bg-color="var(--background)" />

    <!-- Forward the other slots as they are: #node-<type>, #edge-<type>, #connection-line, #zoom-pane. -->
    <template v-for="name in forwardedSlotNames" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>

    <slot />
  </VueFlow>
</template>

<style>
/* Vue Flow ships its defaults as plain colors; map them to Edmi tokens (specificity 0,2,0 beats the library). */
[data-slot="ai-canvas"] .vue-flow__edge-path {
  stroke: var(--muted-foreground);
  stroke-width: 1.6;
}
[data-slot="ai-canvas"] .vue-flow__edge.selected .vue-flow__edge-path {
  stroke: var(--foreground);
}
[data-slot="ai-canvas"] .vue-flow__connection-path {
  stroke: var(--ring);
  stroke-width: 1.6;
}
[data-slot="ai-canvas"] .vue-flow__selection,
[data-slot="ai-canvas"] .vue-flow__nodesselection-rect {
  border: 1px solid var(--ring);
  background: var(--ring-soft);
}
</style>

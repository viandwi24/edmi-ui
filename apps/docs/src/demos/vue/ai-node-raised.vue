<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];

const nodes = levels.map(({ value, label }, i) => ({
  id: value,
  type: "step",
  position: { x: (i % 2) * 290, y: Math.floor(i / 2) * 170 },
  data: { elevation: value, label },
}));

// Four nodes at zoom 1 with room around them.
const fit = (flow: { fitView: (o: { maxZoom: number; padding: number }) => unknown }) =>
  setTimeout(() => flow.fitView({ maxZoom: 1, padding: 0.2 }), 50);
</script>

<template>
  <div class="h-[26rem] w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]" :fit-view-on-init="false" @init="fit">
      <template #node-step="{ data }">
        <Node :handles="{ target: true, source: true }" :elevation="data.elevation">
          <NodeHeader>
            <NodeTitle>Check drift</NodeTitle>
            <NodeDescription>{{ data.label }}</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <span class="font-mono text-xs">MAG4 drift: <b>2.4%</b></span>
          </NodeContent>
          <NodeFooter>412 ms</NodeFooter>
        </Node>
      </template>
    </Canvas>
  </div>
</template>

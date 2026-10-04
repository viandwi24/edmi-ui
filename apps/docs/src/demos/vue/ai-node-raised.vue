<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const nodes = [{ id: "check", type: "check", position: { x: 0, y: 0 }, data: {} }];

// One node at zoom 1 with room around it (the default fit view zooms a lone node to 1.5x).
const fit = (flow: { fitView: (o: { maxZoom: number; padding: number }) => unknown }) =>
  setTimeout(() => flow.fitView({ maxZoom: 1, padding: 0.4 }), 50);
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]" :fit-view-on-init="false" @init="fit">
      <template #node-check>
        <Node :handles="{ target: true, source: true }" raised>
          <NodeHeader>
            <NodeTitle>Check drift</NodeTitle>
            <NodeDescription>Tool · get_prices</NodeDescription>
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

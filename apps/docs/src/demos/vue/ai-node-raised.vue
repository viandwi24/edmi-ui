<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const nodes = [{ id: "check", type: "check", position: { x: 0, y: 0 }, data: {} }];
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]">
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

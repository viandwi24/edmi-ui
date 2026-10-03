<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";
import { Badge } from "@edmi-vue/ui/badge";

const nodes = [
  { id: "check", type: "check", position: { x: 0, y: 0 }, data: {} },
  { id: "decision", type: "decision", position: { x: 300, y: 0 }, data: {}, selected: true },
];
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]">
      <template #node-check>
        <Node :handles="{ target: true, source: true }">
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
      <template #node-decision="{ selected }">
        <Node :handles="{ target: true, source: true }" :selected="selected">
          <NodeHeader>
            <NodeTitle>Decision</NodeTitle>
            <NodeDescription>drift &gt; 2%?</NodeDescription>
          </NodeHeader>
          <NodeContent class="flex gap-1.5">
            <Badge variant="success">yes</Badge>
            <Badge variant="outline">no</Badge>
          </NodeContent>
          <NodeFooter>selected</NodeFooter>
        </Node>
      </template>
    </Canvas>
  </div>
</template>

<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Controls } from "@edmi-vue/components/ai/controls";
import { Node, NodeDescription, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const nodes = [
  { id: "a", type: "step", position: { x: 0, y: 0 }, data: { t: "Start" } },
  { id: "b", type: "step", position: { x: 300, y: 40 }, data: { t: "Check drift" } },
];
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]">
      <template #node-step="{ data }">
        <Node class="w-40">
          <NodeHeader class="border-b-0">
            <NodeTitle>{{ data.t }}</NodeTitle>
            <NodeDescription>Step</NodeDescription>
          </NodeHeader>
        </Node>
      </template>
      <Controls position="bottom-left" />
    </Canvas>
  </div>
</template>

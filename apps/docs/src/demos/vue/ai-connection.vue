<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Connection } from "@edmi-vue/components/ai/connection";
import { Node, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const nodes = [
  { id: "a", type: "step", position: { x: 0, y: 40 }, data: { l: "Start", t: false } },
  { id: "b", type: "step", position: { x: 320, y: 40 }, data: { l: "Check drift", t: true } },
];
</script>

<template>
  <div class="relative h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <p class="absolute z-10 m-3 text-xs text-muted-foreground">Drag from the right handle of Start.</p>
    <Canvas :nodes="nodes" :edges="[]">
      <template #node-step="{ data }">
        <Node :handles="{ target: data.t, source: !data.t }" class="w-40">
          <NodeHeader class="border-b-0">
            <NodeTitle>{{ data.l }}</NodeTitle>
          </NodeHeader>
        </Node>
      </template>
      <template #connection-line="props">
        <Connection v-bind="props" />
      </template>
    </Canvas>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from "vue";
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Edge } from "@edmi-vue/components/ai/edge";
import { Node, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";

const nodes = [
  { id: "a", type: "step", position: { x: 0, y: 40 }, data: { l: "Start", t: false } },
  { id: "b", type: "step", position: { x: 320, y: 0 }, data: { l: "Check drift", t: true } },
  { id: "c", type: "step", position: { x: 320, y: 120 }, data: { l: "Draft post", t: true } },
  { id: "d", type: "step", position: { x: 320, y: 240 }, data: { l: "Escalate", t: true } },
];

const edges = [
  { id: "e1", source: "a", target: "b", type: "animated" },
  { id: "e2", source: "a", target: "c" },
  { id: "e3", source: "a", target: "d", type: "temporary" },
];

const edgeTypes = { animated: markRaw(Edge.Animated), temporary: markRaw(Edge.Temporary) };
</script>

<template>
  <div class="h-72 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="edges" :edge-types="edgeTypes">
      <template #node-step="{ data }">
        <Node :handles="{ target: data.t, source: !data.t }" class="w-40">
          <NodeHeader class="border-b-0">
            <NodeTitle>{{ data.l }}</NodeTitle>
          </NodeHeader>
        </Node>
      </template>
    </Canvas>
  </div>
</template>

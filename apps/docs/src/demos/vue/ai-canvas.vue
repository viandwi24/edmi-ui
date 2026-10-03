<script setup lang="ts">
import { markRaw } from "vue";
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Controls } from "@edmi-vue/components/ai/controls";
import { Edge } from "@edmi-vue/components/ai/edge";
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";
import { Panel } from "@edmi-vue/components/ai/panel";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";

const nodes = [
  { id: "start", type: "step", position: { x: 0, y: 90 }, data: { title: "Start", description: "Trigger · every hour", body: "cron 0 * * * *", handles: { target: false, source: true } } },
  { id: "drift", type: "step", position: { x: 330, y: 0 }, data: { title: "Check drift", description: "Tool · get_prices", body: "MAG4 drift: 2.4%", footer: "412 ms", handles: { target: true, source: true } } },
  { id: "post", type: "step", position: { x: 330, y: 190 }, data: { title: "Draft feed post", description: "Agent · writer", body: "Writing...", footer: "running", handles: { target: true, source: true } } },
  { id: "decision", type: "step", position: { x: 660, y: 0 }, data: { title: "Decision", description: "drift > 2%?", body: "yes / no", handles: { target: true, source: true } } },
];

const edges = [
  { id: "e1", source: "start", target: "drift", type: "animated" },
  { id: "e2", source: "start", target: "post" },
  { id: "e3", source: "drift", target: "decision", type: "animated" },
  { id: "e4", source: "post", target: "decision", type: "temporary" },
];

const edgeTypes = { animated: markRaw(Edge.Animated), temporary: markRaw(Edge.Temporary) };
</script>

<template>
  <div class="h-[420px] w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="edges" :edge-types="edgeTypes">
      <template #node-step="{ data, selected }">
        <Node :handles="data.handles" :selected="selected">
          <NodeHeader>
            <NodeTitle>{{ data.title }}</NodeTitle>
            <NodeDescription>{{ data.description }}</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <Badge v-if="data.body === 'cron 0 * * * *'" variant="secondary">{{ data.body }}</Badge>
            <span v-else class="font-mono text-xs">{{ data.body }}</span>
          </NodeContent>
          <NodeFooter v-if="data.footer">{{ data.footer }}</NodeFooter>
        </Node>
      </template>
      <Controls />
      <Panel position="top-right">
        <Button size="sm">Run</Button>
      </Panel>
    </Canvas>
  </div>
</template>

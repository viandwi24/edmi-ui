<script setup lang="ts">
import { CopyIcon, SettingsIcon, Trash2Icon } from "@lucide/vue";
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Node, NodeContent, NodeDescription, NodeHeader, NodeTitle } from "@edmi-vue/components/ai/node";
import { Toolbar } from "@edmi-vue/components/ai/toolbar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";

const nodes = [{ id: "decision", type: "decision", position: { x: 0, y: 40 }, data: {}, selected: true }];

// One node at zoom 1 with room around it (the default fit view zooms a lone node to 1.5x).
const fit = (flow: { fitView: (o: { maxZoom: number; padding: number }) => unknown }) =>
  setTimeout(() => flow.fitView({ maxZoom: 1, padding: 0.4 }), 50);
</script>

<template>
  <div class="h-64 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="nodes" :edges="[]" :fit-view-on-init="false" @init="fit">
      <template #node-decision="{ selected }">
        <Toolbar :is-visible="true">
          <Button size="icon-xs" variant="ghost" aria-label="Settings"><SettingsIcon /></Button>
          <Button size="icon-xs" variant="ghost" aria-label="Duplicate"><CopyIcon /></Button>
          <Button size="icon-xs" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
        </Toolbar>
        <Node :handles="{ target: true, source: true }" :selected="selected">
          <NodeHeader>
            <NodeTitle>Decision</NodeTitle>
            <NodeDescription>drift &gt; 2%?</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <Badge variant="success">yes</Badge>
          </NodeContent>
        </Node>
      </template>
    </Canvas>
  </div>
</template>

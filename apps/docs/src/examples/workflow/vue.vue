<script setup lang="ts">
import { CopyIcon, PlayIcon, SettingsIcon, Trash2Icon } from "@lucide/vue";
import { markRaw } from "vue";
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Controls } from "@edmi-vue/components/ai/controls";
import { Edge } from "@edmi-vue/components/ai/edge";
import {
  Node,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@edmi-vue/components/ai/node";
import { Panel } from "@edmi-vue/components/ai/panel";
import { Toolbar } from "@edmi-vue/components/ai/toolbar";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { edges, legend, nodes } from "./data";

const edgeTypes = { animated: markRaw(Edge.Animated), temporary: markRaw(Edge.Temporary) };
</script>

<template>
  <div class="h-svh min-h-96 w-full bg-background text-foreground">
    <Canvas :nodes="nodes" :edges="edges" :edge-types="edgeTypes">
      <template #node-step="{ data, selected }">
        <Toolbar v-if="data.toolbar" :is-visible="selected">
          <Button size="icon-xs" variant="ghost" aria-label="Settings"><SettingsIcon /></Button>
          <Button size="icon-xs" variant="ghost" aria-label="Duplicate"><CopyIcon /></Button>
          <Button size="icon-xs" variant="ghost" aria-label="Delete"><Trash2Icon /></Button>
        </Toolbar>
        <Node :handles="data.handles" :selected="selected">
          <NodeHeader>
            <NodeTitle>{{ data.title }}</NodeTitle>
            <NodeDescription v-if="data.description">{{ data.description }}</NodeDescription>
          </NodeHeader>
          <NodeContent v-if="data.body || data.badges || data.actions" :class="data.badges || data.actions ? 'flex gap-1.5' : undefined">
            <template v-if="data.badges">
              <Badge variant="success">{{ data.badges[0] }}</Badge>
              <Badge variant="outline">{{ data.badges[1] }}</Badge>
            </template>
            <template v-else-if="data.actions">
              <Button size="xs">{{ data.actions[0] }}</Button>
              <Button size="xs" variant="outline">{{ data.actions[1] }}</Button>
            </template>
            <Badge v-else-if="data.bodyBadge" variant="secondary">{{ data.body }}</Badge>
            <span v-else class="font-mono text-xs">{{ data.body }}</span>
          </NodeContent>
          <NodeFooter v-if="data.footer">{{ data.footer }}</NodeFooter>
        </Node>
      </template>
      <Controls position="bottom-left" />
      <Panel position="top-left" class="px-3 py-2.5 text-xs">
        <p class="mb-1.5 font-semibold">Legend</p>
        <p v-for="(item, i) in legend" :key="item.label" :class="i ? 'mt-1 flex items-center gap-2' : 'flex items-center gap-2'">
          <svg aria-hidden="true" height="6" width="26"><path d="M0 3h26" :stroke="item.color" :stroke-dasharray="item.dash" stroke-width="1.6" /></svg>
          {{ item.label }}
        </p>
      </Panel>
      <Panel position="top-right" class="flex items-center gap-1.5">
        <Button size="sm">
          <PlayIcon class="size-3.5" />
          Run
        </Button>
        <Button size="sm" variant="outline">Save</Button>
      </Panel>
    </Canvas>
  </div>
</template>

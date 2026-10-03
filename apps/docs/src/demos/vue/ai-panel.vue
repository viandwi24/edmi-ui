<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Panel } from "@edmi-vue/components/ai/panel";
import { Button } from "@edmi-vue/ui/button";
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="[]" :edges="[]">
      <Panel position="top-left" class="px-3 py-2.5 text-xs">
        <p class="mb-1.5 font-semibold">Legend</p>
        <p class="flex items-center gap-2">
          <svg aria-hidden="true" height="6" width="26"><path d="M0 3h26" stroke="var(--brand)" stroke-dasharray="6 5" stroke-width="1.6" /></svg>
          active flow
        </p>
        <p class="mt-1 flex items-center gap-2">
          <svg aria-hidden="true" height="6" width="26"><path d="M0 3h26" stroke="var(--muted-foreground-2)" stroke-dasharray="2 5" stroke-width="1.6" /></svg>
          conditional
        </p>
      </Panel>
      <Panel position="top-right" class="flex items-center gap-1.5">
        <Button size="sm">Run</Button>
        <Button size="sm" variant="outline">Save</Button>
      </Panel>
    </Canvas>
  </div>
</template>

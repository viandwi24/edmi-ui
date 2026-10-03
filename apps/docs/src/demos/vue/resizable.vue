<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@edmi-vue/ui/resizable";

const pane = "flex h-full items-center justify-center text-sm text-muted-foreground";
</script>

<template>
  <div class="flex flex-col gap-6">
    <ResizablePanelGroup
      id="edmi-resizable-a"
      direction="horizontal"
      class="h-[180px] max-w-md rounded-xl border border-border bg-card"
    >
      <ResizablePanel :default-size="60">
        <div :class="pane">Chart</div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="40">
        <div :class="pane">Order book</div>
      </ResizablePanel>
    </ResizablePanelGroup>
    <ResizablePanelGroup
      id="edmi-resizable-b"
      direction="horizontal"
      class="h-[220px] max-w-md rounded-xl border border-border bg-card"
    >
      <ResizablePanel :default-size="30">
        <div :class="pane">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="70">
        <ResizablePanelGroup id="edmi-resizable-b-inner" direction="vertical">
          <ResizablePanel :default-size="60">
            <div :class="pane">Editor</div>
          </ResizablePanel>
          <ResizableHandle with-handle />
          <ResizablePanel :default-size="40">
            <div :class="pane">Agent log</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

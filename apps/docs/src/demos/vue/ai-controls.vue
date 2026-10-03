<script setup lang="ts">
import { Canvas } from "@edmi-vue/components/ai/canvas";
import { Controls } from "@edmi-vue/components/ai/controls";
</script>

<template>
  <div class="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
    <Canvas :nodes="[]" :edges="[]">
      <Controls position="bottom-left" />
    </Canvas>
  </div>
</template>

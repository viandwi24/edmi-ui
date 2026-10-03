<script setup lang="ts">
import { Switch } from "@edmi-vue/ui/switch";
</script>

<template>
  <div class="flex flex-col gap-4">
    <label class="flex items-center gap-2.5 text-sm"><Switch default-value /> Keeper on</label>
    <label class="flex items-center gap-2.5 text-sm"><Switch size="sm" /> Small</label>
    <label class="flex items-center gap-2.5 text-sm"><Switch disabled /> Disabled</label>
  </div>
</template>

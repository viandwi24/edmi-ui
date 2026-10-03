<script setup lang="ts">
import { Switch } from "@edmi-vue/ui/switch";
</script>

<template>
  <div class="flex flex-col gap-3 text-sm">
    <label class="flex items-center gap-2.5"><Switch :default-value="true" /> Flat</label>
    <label class="flex items-center gap-2.5"><Switch raised :default-value="true" /> Raised</label>
    <label class="flex items-center gap-2.5"><Switch raised size="sm" :default-value="true" /> Raised, small</label>
  </div>
</template>

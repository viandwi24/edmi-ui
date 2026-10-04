<script setup lang="ts">
import { Switch } from "@edmi-vue/ui/switch";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-6 text-sm">
        <label class="flex items-center gap-2.5"><Switch :elevation="level.value" :default-value="true" /> Keeper on</label>
        <label class="flex items-center gap-2.5"><Switch :elevation="level.value" size="sm" :default-value="true" /> Small</label>
        <label class="flex items-center gap-2.5"><Switch :elevation="level.value" /> Off</label>
      </div>
    </div>
  </div>
</template>

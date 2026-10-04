<script setup lang="ts">
import { Checkbox } from "@edmi-vue/ui/checkbox";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-center gap-6 text-sm">
        <label class="flex items-center gap-2.5"><Checkbox :elevation="level.value" :default-value="true" /> Checked</label>
        <label class="flex items-center gap-2.5"><Checkbox :elevation="level.value" model-value="indeterminate" /> Indeterminate</label>
        <label class="flex items-center gap-2.5"><Checkbox :elevation="level.value" /> Unchecked</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Slider } from "@edmi-vue/ui/slider";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex w-72 flex-col gap-5">
        <Slider :elevation="level.value" :default-value="[40]" :max="100" />
        <Slider :elevation="level.value" :default-value="[20, 70]" :max="100" />
      </div>
    </div>
  </div>
</template>

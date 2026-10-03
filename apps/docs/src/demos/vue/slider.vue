<script setup lang="ts">
import { Slider } from "@edmi-vue/ui/slider";
</script>

<template>
  <div class="flex w-72 flex-col gap-6">
    <Slider :default-value="[33]" :max="100" :step="1" />
    <Slider :default-value="[25, 75]" />
    <Slider :default-value="[20, 50, 80]" />
  </div>
</template>

<script setup lang="ts">
import { Slider } from "@edmi-vue/ui/slider";
</script>

<template>
  <div class="flex w-72 flex-col gap-6">
    <Slider :default-value="[40]" :max="100" />
    <Slider raised :default-value="[40]" :max="100" />
    <Slider raised :default-value="[20, 70]" :max="100" />
  </div>
</template>

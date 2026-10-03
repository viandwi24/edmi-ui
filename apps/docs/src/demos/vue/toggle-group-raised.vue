<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";

const ranges = ["1D", "1W", "1M", "1Y", "All"];
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ToggleGroup type="single" variant="segmented" default-value="1M">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="segmented" raised default-value="1M">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" raised :spacing="0" default-value="1M">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

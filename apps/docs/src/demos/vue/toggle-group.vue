<script setup lang="ts">
import { Bold, Italic, Underline } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";

const ranges = ["1D", "1W", "1M", "1Y", "All"];
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ToggleGroup type="multiple" :default-value="['b']">
      <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="i" aria-label="Italic"><Italic /></ToggleGroupItem>
      <ToggleGroupItem value="u" aria-label="Underline"><Underline /></ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" :spacing="0" default-value="1M">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="segmented" default-value="1M">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="multiple" orientation="vertical" variant="outline">
      <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="i" aria-label="Italic"><Italic /></ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

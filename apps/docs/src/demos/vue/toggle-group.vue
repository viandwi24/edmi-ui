<script setup lang="ts">
import { Bold, Italic, Underline } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { ref } from "vue";

const ranges = ["1D", "1W", "1M", "1Y", "All"];
const range = ref("1M");
// A range always has one value: ignore the empty value a second click on the active item produces.
function setRange(v: unknown) {
  if (typeof v === "string" && v) range.value = v;
}
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ToggleGroup type="multiple" :default-value="['b']">
      <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="i" aria-label="Italic"><Italic /></ToggleGroupItem>
      <ToggleGroupItem value="u" aria-label="Underline"><Underline /></ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="outline" :spacing="0" :model-value="range" @update:model-value="setRange">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="single" variant="segmented" :model-value="range" @update:model-value="setRange">
      <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup type="multiple" orientation="vertical" variant="outline">
      <ToggleGroupItem value="b" aria-label="Bold"><Bold /></ToggleGroupItem>
      <ToggleGroupItem value="i" aria-label="Italic"><Italic /></ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>

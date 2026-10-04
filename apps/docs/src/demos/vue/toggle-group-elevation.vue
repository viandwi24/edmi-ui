<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { ref } from "vue";

const ranges = ["1D", "1W", "1M", "1Y", "All"];
const range = ref("1M");
// A range always has one value: ignore the empty value a second click on the active item produces.
function setRange(v: unknown) {
  if (typeof v === "string" && v) range.value = v;
}

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="flex flex-wrap items-start gap-6">
        <ToggleGroup type="single" variant="segmented" :elevation="level.value" :model-value="range" @update:model-value="setRange">
          <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" :spacing="0" :elevation="level.value" :model-value="range" @update:model-value="setRange">
          <ToggleGroupItem v-for="v in ranges" :key="v" :value="v">{{ v }}</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  </div>
</template>

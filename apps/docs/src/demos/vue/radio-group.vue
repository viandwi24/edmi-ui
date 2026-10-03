<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@edmi-vue/ui/radio-group";

const options = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "drift", label: "On drift only" },
];
</script>

<template>
  <RadioGroup default-value="weekly" class="w-fit">
    <label v-for="o in options" :key="o.value" class="flex items-center gap-2.5 text-sm">
      <RadioGroupItem :value="o.value" />
      {{ o.label }}
    </label>
  </RadioGroup>
</template>

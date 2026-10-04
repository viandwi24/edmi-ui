<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { DatePicker } from "@edmi-vue/ui/date-picker";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <DatePicker :elevation="level.value" :default-value="new CalendarDate(2026, 10, 16)" />
    </div>
  </div>
</template>

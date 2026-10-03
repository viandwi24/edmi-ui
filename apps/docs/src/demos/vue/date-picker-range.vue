<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { DateRangePicker } from "@edmi-vue/ui/date-picker";
</script>

<template>
  <DateRangePicker
    presets
    :default-value="{ start: new CalendarDate(2026, 10, 12), end: new CalendarDate(2026, 10, 18) }"
  />
</template>

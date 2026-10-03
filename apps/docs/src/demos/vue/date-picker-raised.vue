<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { DatePicker } from "@edmi-vue/ui/date-picker";
</script>

<template>
  <DatePicker raised :default-value="new CalendarDate(2026, 10, 16)" />
</template>

<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { Calendar } from "@edmi-vue/ui/calendar";
import { ref } from "vue";

const date = ref(new CalendarDate(2026, 10, 16));
</script>

<template>
  <Calendar
    v-model="date"
    layout="month-and-year"
    :min-value="new CalendarDate(2020, 1, 1)"
    :max-value="new CalendarDate(2030, 12, 31)"
    class="rounded-xl border border-border"
  />
</template>

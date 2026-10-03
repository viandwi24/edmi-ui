<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { RangeCalendar } from "@edmi-vue/ui/calendar";
import { ref } from "vue";

const range = ref({ start: new CalendarDate(2026, 10, 12), end: new CalendarDate(2026, 10, 18) });
</script>

<template>
  <RangeCalendar v-model="range" class="rounded-xl border border-border" />
</template>

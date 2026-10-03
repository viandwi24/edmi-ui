<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { Calendar } from "@edmi-vue/ui/calendar";
import { ref } from "vue";

const date = ref(new CalendarDate(2026, 10, 16));
</script>

<template>
  <Calendar v-model="date" class="rounded-xl border border-border" />
</template>

<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["checkbox", "radio-group", "switch", "slider", "combobox", "combobox-multiple", "calendar", "calendar-range", "calendar-dropdown", "date-picker", "date-picker-range", "checkbox-elevation", "radio-group-elevation", "switch-elevation", "slider-elevation", "calendar-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

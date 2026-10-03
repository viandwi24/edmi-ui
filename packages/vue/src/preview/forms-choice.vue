<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["checkbox", "radio-group", "switch", "slider", "combobox", "combobox-multiple", "calendar", "calendar-range", "calendar-dropdown", "date-picker", "date-picker-range", "checkbox-raised", "radio-group-raised", "switch-raised", "slider-raised", "calendar-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

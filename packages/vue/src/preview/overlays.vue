<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["alert", "alert-dialog", "dialog", "sheet", "drawer", "sonner", "tooltip", "hover-card", "popover", "dialog-elevation", "alert-dialog-elevation", "popover-elevation", "sonner-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

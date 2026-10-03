<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["label", "input", "input-group", "input-otp", "textarea", "native-select", "select", "field", "native-select-raised", "select-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

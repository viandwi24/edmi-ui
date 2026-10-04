<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["button", "button-group", "toggle", "toggle-group", "badge", "kbd", "button-elevation", "toggle-elevation", "toggle-group-elevation", "kbd-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

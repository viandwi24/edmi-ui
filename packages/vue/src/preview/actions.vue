<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["button", "button-group", "toggle", "toggle-group", "badge", "kbd", "button-raised", "toggle-raised", "toggle-group-raised", "kbd-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

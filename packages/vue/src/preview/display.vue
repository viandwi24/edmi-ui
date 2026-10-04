<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["card", "inset-panel", "item", "avatar", "aspect-ratio", "attachment", "separator", "skeleton", "spinner", "progress", "empty", "card-elevation", "inset-panel-elevation", "empty-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

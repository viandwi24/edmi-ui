<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["tabs", "accordion", "accordion-multiple", "collapsible", "resizable", "scroll-area", "carousel", "direction", "tabs-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>

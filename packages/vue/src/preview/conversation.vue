<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["bubble", "message", "marker", "message-scroller", "questionnaire", "bubble-elevation", "questionnaire-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>
